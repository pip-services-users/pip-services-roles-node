"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const RolesFactory_1 = require("../build/RolesFactory");
class RolesProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve Roles components
        references.put(RolesFactory_1.RolesFactory.Descriptor, new RolesFactory_1.RolesFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("roles", args, "./config/config.yaml");
    }
}
exports.RolesProcess = RolesProcess;
//# sourceMappingURL=RolesProcess.js.map