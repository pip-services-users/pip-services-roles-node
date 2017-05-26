import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesController } from './IRolesController';
export declare class RolesController implements IConfigurable, IReferenceable, ICommandable, IRolesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<UserRolesV1>) => void): void;
    getRolesById(correlationId: string, userId: string, callback: (err: any, roles: string[]) => void): void;
    setRoles(correlationId: string, userId: string, roles: string[], callback?: (err: any, roles: string[]) => void): void;
    grantRoles(correlationId: string, userId: string, roles: string[], callback: (err: any, roles: string[]) => void): void;
    revokeRoles(correlationId: string, userId: string, roles: string[], callback: (err: any, roles: string[]) => void): void;
    authorize(correlationId: string, userId: string, roles: string[], callback: (err: any, authorized: boolean) => void): void;
}
