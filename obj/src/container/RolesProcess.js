"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const RolesFactory_1 = require("../build/RolesFactory");
class RolesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesFactory_1.RolesFactory);
    }
}
exports.RolesProcess = RolesProcess;
//# sourceMappingURL=RolesProcess.js.map