import { IPersistence } from 'pip-services-runtime-node';

export interface IRolesPersistence extends IPersistence {
    getRoles(correlationId: string, userId: string, callback: any): void;
    setRoles(correlationId: string, userId: string, roles: string[], callback: any): void;
}
