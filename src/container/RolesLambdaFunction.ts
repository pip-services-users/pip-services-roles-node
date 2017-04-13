import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { RolesFactory } from '../build/RolesFactory';

export class RolesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("roles", "User roles function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-roles', 'controller', 'default', '*', '*'));
        this._factories.add(new RolesFactory());
    }
}

export const handler = new RolesLambdaFunction().getHandler();