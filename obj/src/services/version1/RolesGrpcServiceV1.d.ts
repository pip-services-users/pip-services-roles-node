import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class RolesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getRolesByFilter;
    private getRolesById;
    private setRoles;
    private grantRoles;
    private revokeRoles;
    private authorize;
    register(): void;
}
