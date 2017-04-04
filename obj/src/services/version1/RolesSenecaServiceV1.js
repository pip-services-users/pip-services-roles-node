"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class RolesSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('roles');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-roles', 'controller', 'default', '*', '1.0'));
    }
}
exports.RolesSenecaServiceV1 = RolesSenecaServiceV1;
//# sourceMappingURL=RolesSenecaServiceV1.js.map