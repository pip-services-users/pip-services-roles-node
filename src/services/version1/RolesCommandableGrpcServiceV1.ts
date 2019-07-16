import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class RolesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-roles', 'controller', 'default', '*', '*'));
    }
}