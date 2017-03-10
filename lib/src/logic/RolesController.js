"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var RolesCommandSet_1 = require('./RolesCommandSet');
var RolesController = (function (_super) {
    __extends(RolesController, _super);
    function RolesController() {
        _super.call(this, RolesController.Descriptor);
    }
    RolesController.prototype.link = function (components) {
        // Locate reference to tags persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-roles", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new RolesCommandSet_1.RolesCommandSet(this);
        this.addCommandSet(commands);
    };
    RolesController.prototype.getRoles = function (correlationId, userId, callback) {
        callback = this.instrument(correlationId, 'roles.get_roles', callback);
        this._db.getRoles(correlationId, userId, callback);
    };
    RolesController.prototype.setRoles = function (correlationId, userId, roles, callback) {
        callback = this.instrument(correlationId, 'roles.set_roles', callback);
        this._db.setRoles(correlationId, userId, roles, callback);
    };
    RolesController.prototype.grantRoles = function (correlationId, userId, roles, callback) {
        var _this = this;
        callback = this.instrument(correlationId, 'roles.grant_role', callback);
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback)
                callback();
            return;
        }
        this.getRoles(correlationId, userId, function (err, existingRoles) {
            if (err) {
                callback(err);
                return;
            }
            var newRoles = _.union(roles, existingRoles);
            _this.setRoles(correlationId, userId, newRoles, callback);
        });
    };
    RolesController.prototype.revokeRoles = function (correlationId, userId, roles, callback) {
        var _this = this;
        callback = this.instrument(correlationId, 'roles.revoke_role', callback);
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback)
                callback();
            return;
        }
        this.getRoles(correlationId, userId, function (err, existingRoles) {
            if (err) {
                callback(err);
                return;
            }
            var newRoles = _.difference(existingRoles, roles);
            _this.setRoles(correlationId, userId, newRoles, callback);
        });
    };
    RolesController.prototype.authorize = function (correlationId, userId, roles, callback) {
        callback = this.instrument(correlationId, 'roles.authorize', callback);
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback)
                callback(null, true);
            return;
        }
        this.getRoles(correlationId, userId, function (err, existingRoles) {
            if (err) {
                callback(err);
                return;
            }
            var authorized = _.difference(roles, existingRoles).length == 0;
            callback(null, authorized);
        });
    };
    /**
     * Unique descriptor for the RolesController component
     */
    RolesController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-roles", "*", "*");
    return RolesController;
}(pip_services_runtime_node_3.AbstractController));
exports.RolesController = RolesController;
