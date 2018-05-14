"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const RolesServiceFactory_1 = require("../build/RolesServiceFactory");
class RolesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory_1.RolesServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.RolesProcess = RolesProcess;
//# sourceMappingURL=RolesProcess.js.map