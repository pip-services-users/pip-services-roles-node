"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const RolesMongoDbPersistence_1 = require("../persistence/RolesMongoDbPersistence");
const RolesFilePersistence_1 = require("../persistence/RolesFilePersistence");
const RolesMemoryPersistence_1 = require("../persistence/RolesMemoryPersistence");
const RolesController_1 = require("../logic/RolesController");
const RolesHttpServiceV1_1 = require("../services/version1/RolesHttpServiceV1");
const RolesSenecaServiceV1_1 = require("../services/version1/RolesSenecaServiceV1");
class RolesServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(RolesServiceFactory.MemoryPersistenceDescriptor, RolesMemoryPersistence_1.RolesMemoryPersistence);
        this.registerAsType(RolesServiceFactory.FilePersistenceDescriptor, RolesFilePersistence_1.RolesFilePersistence);
        this.registerAsType(RolesServiceFactory.MongoDbPersistenceDescriptor, RolesMongoDbPersistence_1.RolesMongoDbPersistence);
        this.registerAsType(RolesServiceFactory.ControllerDescriptor, RolesController_1.RolesController);
        this.registerAsType(RolesServiceFactory.SenecaServiceDescriptor, RolesSenecaServiceV1_1.RolesSenecaServiceV1);
        this.registerAsType(RolesServiceFactory.HttpServiceDescriptor, RolesHttpServiceV1_1.RolesHttpServiceV1);
    }
}
RolesServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-roles", "factory", "default", "default", "1.0");
RolesServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-roles", "persistence", "memory", "*", "1.0");
RolesServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-roles", "persistence", "file", "*", "1.0");
RolesServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-roles", "persistence", "mongodb", "*", "1.0");
RolesServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-roles", "controller", "default", "*", "1.0");
RolesServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-roles", "service", "seneca", "*", "1.0");
RolesServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-roles", "service", "http", "*", "1.0");
exports.RolesServiceFactory = RolesServiceFactory;
//# sourceMappingURL=RolesServiceFactory.js.map