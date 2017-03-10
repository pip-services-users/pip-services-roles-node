"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var RolesMongoDbPersistence_1 = require('../persistence/RolesMongoDbPersistence');
var RolesFilePersistence_1 = require('../persistence/RolesFilePersistence');
var RolesMemoryPersistence_1 = require('../persistence/RolesMemoryPersistence');
var RolesController_1 = require('../logic/RolesController');
var RolesRestService_1 = require('../services/version1/RolesRestService');
var RolesSenecaService_1 = require('../services/version1/RolesSenecaService');
var RolesFactory = (function (_super) {
    __extends(RolesFactory, _super);
    function RolesFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(RolesFilePersistence_1.RolesFilePersistence.Descriptor, RolesFilePersistence_1.RolesFilePersistence);
        this.register(RolesMemoryPersistence_1.RolesMemoryPersistence.Descriptor, RolesMemoryPersistence_1.RolesMemoryPersistence);
        this.register(RolesMongoDbPersistence_1.RolesMongoDbPersistence.Descriptor, RolesMongoDbPersistence_1.RolesMongoDbPersistence);
        this.register(RolesController_1.RolesController.Descriptor, RolesController_1.RolesController);
        this.register(RolesRestService_1.RolesRestService.Descriptor, RolesRestService_1.RolesRestService);
        this.register(RolesSenecaService_1.RolesSenecaService.Descriptor, RolesSenecaService_1.RolesSenecaService);
    }
    RolesFactory.Instance = new RolesFactory();
    return RolesFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.RolesFactory = RolesFactory;
