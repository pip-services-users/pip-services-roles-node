import { IGetter } from 'pip-services-data-node';
import { ISetter } from 'pip-services-data-node';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
export interface IRolesPersistence extends IGetter<UserRolesV1, string>, ISetter<UserRolesV1> {
    getOneById(correlation_id: string, id: string, callback: (err: any, item: UserRolesV1) => void): void;
    set(correlation_id: string, item: UserRolesV1, callback?: (err: any, item: UserRolesV1) => void): void;
}
