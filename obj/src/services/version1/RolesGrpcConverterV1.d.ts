import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { UserRolesV1 } from '../../data/version1/UserRolesV1';
export declare class RolesGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson(value);
    private static fromJson(value);
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromUserRoles(userRoles: UserRolesV1): any;
    static toUserRoles(obj: any): UserRolesV1;
    static fromUserRolesPage(page: DataPage<UserRolesV1>): any;
    static toUserRolesPage(obj: any): DataPage<UserRolesV1>;
}
