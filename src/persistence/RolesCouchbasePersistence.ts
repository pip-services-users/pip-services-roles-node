let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from './IRolesPersistence';

export class RolesCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<UserRolesV1, string> 
    implements IRolesPersistence {

    constructor() {
        super('users', 'roles');
    }

    private composeFilter(filter: FilterParams) {
        filter = filter || new FilterParams();

        let filters = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            filters.push("id IN ['" + ids.join("','") + "']");
    
        // Filter except ids
        let exceptIds = filter.getAsObject('except_ids');
        if (_.isString(exceptIds))
            exceptIds = exceptIds.split(',');
        if (_.isArray(exceptIds))
            filters.push("id NOT IN ['" + exceptIds.join("','") + "']");

        // Filter roles
        let roles = filter.getAsObject('roles');
        if (_.isString(roles))
            roles = roles.split(',');
        if (_.isArray(roles)) {
            let roleFilters = _.map(roles, role => "ARRAY_CONTAINS(`" + this._bucketName + "`.roles,'" + role + "')");
            if (roleFilters.length > 0)
                filters.push("(" + roleFilters.join(" OR ") + ")");
        }

        // Filter except roles
        let exceptRoles = filter.getAsObject('except_roles');
        if (_.isString(exceptRoles))
            exceptRoles = exceptRoles.split(',');
        if (_.isArray(exceptRoles)) {
            let roleFilters = _.map(roles, role => "(NOT ARRAY_CONTAINS(`" + this._bucketName + "`.roles,'" + role + "'))");
            if (roleFilters.length > 0)
                filters.push("(" + roleFilters.join(" AND ") + ")");
        }

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<UserRolesV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public set(correlationId: string, item: UserRolesV1,
        callback: (err: any, item: UserRolesV1) => void): void {
        if (item == null) {
            callback(null, null);
            return;
        }

        item = _.clone(item);
        item.update_time = new Date();
        super.set(correlationId, item, callback);
    }
}
