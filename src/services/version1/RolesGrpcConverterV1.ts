let _ = require('lodash');
let messages = require('../../../../src/protos/roles_v1_pb');

import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { ErrorDescriptionFactory } from 'pip-services3-commons-node';
import { ErrorDescription } from 'pip-services3-commons-node';
import { ApplicationExceptionFactory } from 'pip-services3-commons-node';

import { UserRolesV1 } from '../../data/version1/UserRolesV1';

export class RolesGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        RolesGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: RolesGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (_.isFunction(values.toObject))
            values = values.toObject();

        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        RolesGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromUserRoles(userRoles: UserRolesV1): any {
        if (userRoles == null) return null;

        let obj = new messages.UserRoles();

        obj.setId(userRoles.id);
        obj.setUpdateTime(StringConverter.toString(userRoles.update_time))
        obj.setRolesList(userRoles.roles);

        return obj;
    }

    public static toUserRoles(obj: any): UserRolesV1 {
        if (obj == null) return null;

        let userRoles: UserRolesV1 = {
            id: obj.getId(),
            update_time: DateTimeConverter.toDateTime(obj.getUpdateTime()),
            roles: obj.getRolesList()
        };

        return userRoles;
    }

    public static fromUserRolesPage(page: DataPage<UserRolesV1>): any {
        if (page == null) return null;

        let obj = new messages.UserRolesPage();

        obj.setTotal(page.total);
        let data = _.map(page.data, RolesGrpcConverterV1.fromUserRoles);
        obj.setDataList(data);

        return obj;
    }

    public static toUserRolesPage(obj: any): DataPage<UserRolesV1> {
        if (obj == null) return null;

        let data = _.map(obj.getDataList(), RolesGrpcConverterV1.toUserRoles);
        let page: DataPage<UserRolesV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}