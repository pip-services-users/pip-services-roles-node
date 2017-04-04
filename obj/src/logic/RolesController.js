"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const UserRolesV1_1 = require("../data/version1/UserRolesV1");
const RolesCommandSet_1 = require("./RolesCommandSet");
class RolesController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(RolesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new RolesCommandSet_1.RolesCommandSet(this);
        return this._commandSet;
    }
    getRoles(correlationId, userId, callback) {
        this._persistence.getOneById(correlationId, userId, (err, roles) => {
            callback(err, roles ? roles.roles : null);
        });
    }
    setRoles(correlationId, userId, roles, callback) {
        let item = new UserRolesV1_1.UserRolesV1(userId, roles);
        this._persistence.set(correlationId, item, (err, roles) => {
            if (callback)
                callback(err, roles ? roles.roles : null);
        });
    }
    grantRoles(correlationId, userId, roles, callback) {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback)
                callback(null, null);
            return;
        }
        this.getRoles(correlationId, userId, (err, existingRoles) => {
            if (err) {
                callback(err, null);
                return;
            }
            let newRoles = _.union(roles, existingRoles);
            this.setRoles(correlationId, userId, newRoles, callback);
        });
    }
    revokeRoles(correlationId, userId, roles, callback) {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback)
                callback(null, null);
            return;
        }
        this.getRoles(correlationId, userId, (err, existingRoles) => {
            if (err) {
                callback(err, null);
                return;
            }
            let newRoles = _.difference(existingRoles, roles);
            this.setRoles(correlationId, userId, newRoles, callback);
        });
    }
    authorize(correlationId, userId, roles, callback) {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback)
                callback(null, true);
            return;
        }
        this.getRoles(correlationId, userId, (err, existingRoles) => {
            if (err) {
                callback(err, false);
                return;
            }
            let authorized = _.difference(roles, existingRoles).length == 0;
            callback(null, authorized);
        });
    }
}
RolesController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-roles:persistence:*:*:1.0');
exports.RolesController = RolesController;
//# sourceMappingURL=RolesController.js.map