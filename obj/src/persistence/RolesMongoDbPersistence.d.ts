import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-oss-node';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from './IRolesPersistence';
export declare class RolesMongoDbPersistence extends IdentifiableMongoDbPersistence<UserRolesV1, string> implements IRolesPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<UserRolesV1>) => void): void;
    set(correlationId: string, item: UserRolesV1, callback: (err: any, item: UserRolesV1) => void): void;
}
