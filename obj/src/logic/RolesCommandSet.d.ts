import { CommandSet } from 'pip-services-commons-node';
import { IRolesBusinessLogic } from './IRolesBusinessLogic';
export declare class RolesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRolesBusinessLogic);
    private makeGetRolesCommand();
    private makeSetRolesCommand();
    private makeGrantRolesCommand();
    private makeRevokeRolesCommand();
    private makeAuthorizeCommand();
}
