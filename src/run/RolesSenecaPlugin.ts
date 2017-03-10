import { SenecaPlugin } from 'pip-services-runtime-node';

import { RolesMicroservice} from './RolesMicroservice';

export class RolesSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('roles', new RolesMicroservice());
    }
}