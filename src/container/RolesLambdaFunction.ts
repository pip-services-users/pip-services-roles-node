import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { RolesServiceFactory } from '../build/RolesServiceFactory';

export class RolesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("roles", "User roles function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-roles', 'controller', 'default', '*', '*'));
        this._factories.add(new RolesServiceFactory());
    }
}

export const handler = new RolesLambdaFunction().getHandler();