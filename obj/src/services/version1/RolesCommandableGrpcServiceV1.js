"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class RolesCommandableGrpcServiceV1 extends pip_services3_grpc_node_1.CommandableGrpcService {
    constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-roles', 'controller', 'default', '*', '*'));
    }
}
exports.RolesCommandableGrpcServiceV1 = RolesCommandableGrpcServiceV1;
//# sourceMappingURL=RolesCommandableGrpcServiceV1.js.map