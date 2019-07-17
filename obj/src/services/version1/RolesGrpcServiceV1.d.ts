import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class RolesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getRolesByFilter(call, callback);
    private getRolesById(call, callback);
    private setRoles(call, callback);
    private grantRoles(call, callback);
    private revokeRoles(call, callback);
    private authorize(call, callback);
    register(): void;
}
