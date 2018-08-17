import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class RolesSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('roles');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-roles', 'controller', 'default', '*', '1.0'));
    }
}