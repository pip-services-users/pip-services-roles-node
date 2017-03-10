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
var RolesFilePersistence = (function (_super) {
    __extends(RolesFilePersistence, _super);
    function RolesFilePersistence(descriptor) {
        _super.call(this, descriptor || RolesFilePersistence.Descriptor);
    }
    RolesFilePersistence.prototype.getRoles = function (correlationId, userId, callback) {
        this.getById(userId, function (err, item) {
            var roles = item ? item.roles : [];
            roles = roles || [];
            callback(err, roles);
        });
    };
    RolesFilePersistence.prototype.setRoles = function (correlationId, userId, roles, callback) {
        var _this = this;
        this.getById(userId, function (err, item) {
            if (err) {
                callback(err, null);
                return;
            }
            if (item == null) {
                item = {
                    id: userId
                };
                _this._items.push(item);
            }
            item.roles = roles;
            item.updated = new Date();
            _this.save(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null, roles);
            });
        });
    };
    /**
     * Unique descriptor for the RolesFilePersistence component
     */
    RolesFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-roles", "file", "*");
    return RolesFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.RolesFilePersistence = RolesFilePersistence;
