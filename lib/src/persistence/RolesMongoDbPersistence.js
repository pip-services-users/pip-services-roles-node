"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var async = require('async');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var RolesMongoDbPersistence = (function (_super) {
    __extends(RolesMongoDbPersistence, _super);
    function RolesMongoDbPersistence() {
        _super.call(this, RolesMongoDbPersistence.Descriptor, require('./UserRoleModel'));
    }
    RolesMongoDbPersistence.prototype.getRoles = function (correlationId, userId, callback) {
        var _this = this;
        this._model.findById(userId, function (err, item) {
            var roles = item ? item.roles : [];
            roles = _.map(roles, function (role) { return _this.jsonToPublic(role); });
            callback(err, roles);
        });
    };
    RolesMongoDbPersistence.prototype.setRoles = function (correlationId, userId, roles, callback) {
        var _this = this;
        this._model.findByIdAndUpdate(userId, {
            $set: {
                roles: roles,
                updated: new Date()
            }
        }, {
            'new': true,
            upsert: true
        }, function (err, item) {
            var roles = item ? item.roles : [];
            roles = _.map(roles, function (role) { return _this.jsonToPublic(role); });
            callback(err, roles);
        });
    };
    /**
     * Unique descriptor for the RolesMongoDbPersistence component
     */
    RolesMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-roles", "mongodb", "*");
    return RolesMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.RolesMongoDbPersistence = RolesMongoDbPersistence;
