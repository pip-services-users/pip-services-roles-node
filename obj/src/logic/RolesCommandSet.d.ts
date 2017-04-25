import { CommandSet } from 'pip-services-commons-node';
import { IRolesController } from './IRolesController';
export declare class RolesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRolesController);
    private makeGetRolesCommand();
    private makeSetRolesCommand();
    private makeGrantRolesCommand();
    private makeRevokeRolesCommand();
    private makeAuthorizeCommand();
}
