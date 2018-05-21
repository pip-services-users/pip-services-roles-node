"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const RolesMemoryPersistence_1 = require("../persistence/RolesMemoryPersistence");
const RolesFilePersistence_1 = require("../persistence/RolesFilePersistence");
const RolesMongoDbPersistence_1 = require("../persistence/RolesMongoDbPersistence");
const RolesController_1 = require("../logic/RolesController");
const RolesSenecaServiceV1_1 = require("../services/version1/RolesSenecaServiceV1");
class RolesSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-roles', seneca, RolesSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new RolesController_1.RolesController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new RolesMongoDbPersistence_1.RolesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new RolesFilePersistence_1.RolesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new RolesMemoryPersistence_1.RolesMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new RolesSenecaServiceV1_1.RolesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-roles', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-roles', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-roles', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.RolesSenecaPlugin = RolesSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new RolesSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=RolesSenecaPlugin.js.map