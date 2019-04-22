import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { ISetter } from 'pip-services3-data-node';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
export interface IRolesPersistence extends IGetter<UserRolesV1, string>, ISetter<UserRolesV1> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<UserRolesV1>) => void): void;
    getOneById(correlation_id: string, id: string, callback: (err: any, item: UserRolesV1) => void): void;
    set(correlation_id: string, item: UserRolesV1, callback?: (err: any, item: UserRolesV1) => void): void;
}
