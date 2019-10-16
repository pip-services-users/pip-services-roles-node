import { CommandSet } from 'pip-services3-commons-node';
import { IRolesController } from './IRolesController';
export declare class RolesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRolesController);
    private makeGetRolesByFilterCommand;
    private makeGetRolesByIdCommand;
    private makeSetRolesCommand;
    private makeGrantRolesCommand;
    private makeRevokeRolesCommand;
    private makeAuthorizeCommand;
}
