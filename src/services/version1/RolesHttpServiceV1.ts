import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class RolesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-roles', 'controller', 'default', '*', '1.0'));
    }
}