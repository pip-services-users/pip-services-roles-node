"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const RolesServiceFactory_1 = require("../build/RolesServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class RolesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory_1.RolesServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.RolesProcess = RolesProcess;
//# sourceMappingURL=RolesProcess.js.map