"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const RolesMongoDbPersistence_1 = require("../persistence/RolesMongoDbPersistence");
const RolesFilePersistence_1 = require("../persistence/RolesFilePersistence");
const RolesMemoryPersistence_1 = require("../persistence/RolesMemoryPersistence");
const RolesController_1 = require("../logic/RolesController");
const RolesHttpServiceV1_1 = require("../services/version1/RolesHttpServiceV1");
const RolesSenecaServiceV1_1 = require("../services/version1/RolesSenecaServiceV1");
class RolesFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(RolesFactory.MemoryPersistenceDescriptor, RolesMemoryPersistence_1.RolesMemoryPersistence);
        this.registerAsType(RolesFactory.FilePersistenceDescriptor, RolesFilePersistence_1.RolesFilePersistence);
        this.registerAsType(RolesFactory.MongoDbPersistenceDescriptor, RolesMongoDbPersistence_1.RolesMongoDbPersistence);
        this.registerAsType(RolesFactory.ControllerDescriptor, RolesController_1.RolesController);
        this.registerAsType(RolesFactory.SenecaServiceDescriptor, RolesSenecaServiceV1_1.RolesSenecaServiceV1);
        this.registerAsType(RolesFactory.HttpServiceDescriptor, RolesHttpServiceV1_1.RolesHttpServiceV1);
    }
}
RolesFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-roles", "factory", "default", "default", "1.0");
RolesFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-roles", "persistence", "memory", "*", "1.0");
RolesFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-roles", "persistence", "file", "*", "1.0");
RolesFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-roles", "persistence", "mongodb", "*", "1.0");
RolesFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-roles", "controller", "default", "*", "1.0");
RolesFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-roles", "service", "seneca", "*", "1.0");
RolesFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-roles", "service", "http", "*", "1.0");
exports.RolesFactory = RolesFactory;
//# sourceMappingURL=RolesFactory.js.map