"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var RolesFilePersistence_1 = require('./RolesFilePersistence');
var RolesMemoryPersistence = (function (_super) {
    __extends(RolesMemoryPersistence, _super);
    function RolesMemoryPersistence() {
        _super.call(this, RolesMemoryPersistence.Descriptor);
    }
    RolesMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    RolesMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the RolesFilePersistence component
     */
    RolesMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-roles", "memory", "*");
    return RolesMemoryPersistence;
}(RolesFilePersistence_1.RolesFilePersistence));
exports.RolesMemoryPersistence = RolesMemoryPersistence;
