import { IBusinessLogic } from 'pip-services-runtime-node';

export interface IRolesBusinessLogic extends IBusinessLogic {
    getRoles(correlationId: string, userId: string, callback);
    setRoles(correlationId: string, userId: string, roles: string[], callback);
    grantRoles(correlationId: string, userId: string, roles: string[], callback);
    revokeRoles(correlationId: string, userId: string, roles: string[], callback);
    authorize(correlationId: string, userId: string, roles: string[], callback);
}
