"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const RolesServiceFactory_1 = require("../build/RolesServiceFactory");
class RolesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("roles", "User roles function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-roles', 'controller', 'default', '*', '*'));
        this._factories.add(new RolesServiceFactory_1.RolesServiceFactory());
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.RolesLambdaFunction = RolesLambdaFunction;
exports.handler = new RolesLambdaFunction().getHandler();
//# sourceMappingURL=RolesLambdaFunction.js.map