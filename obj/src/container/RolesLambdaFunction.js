"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const RolesFactory_1 = require("../build/RolesFactory");
class RolesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("roles", "User roles function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-roles', 'controller', 'default', '*', '*'));
        this._factories.add(new RolesFactory_1.RolesFactory());
    }
}
exports.RolesLambdaFunction = RolesLambdaFunction;
exports.handler = new RolesLambdaFunction().getHandler();
//# sourceMappingURL=RolesLambdaFunction.js.map