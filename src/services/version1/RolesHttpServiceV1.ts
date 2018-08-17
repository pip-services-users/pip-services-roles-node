import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class RolesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-roles', 'controller', 'default', '*', '1.0'));
    }
}