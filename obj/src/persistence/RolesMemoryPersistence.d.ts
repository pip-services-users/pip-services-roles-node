import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from './IRolesPersistence';
export declare class RolesMemoryPersistence extends IdentifiableMemoryPersistence<UserRolesV1, string> implements IRolesPersistence {
    constructor();
    set(correlationId: string, item: UserRolesV1, callback: (err: any, item: UserRolesV1) => void): void;
}
