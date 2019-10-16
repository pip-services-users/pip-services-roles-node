"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const RolesServiceFactory_1 = require("../build/RolesServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class RolesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory_1.RolesServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_node_1.DefaultGrpcFactory);
    }
}
exports.RolesProcess = RolesProcess;
//# sourceMappingURL=RolesProcess.js.map