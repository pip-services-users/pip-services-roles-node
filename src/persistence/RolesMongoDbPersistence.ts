let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from './IRolesPersistence';
import { UserRolesMongoDbSchema } from './UserRolesMongoDbSchema';

export class RolesMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<UserRolesV1, string> 
    implements IRolesPersistence {

    constructor() {
        super('user_roles', UserRolesMongoDbSchema());
    }

    private composeFilter(filter: FilterParams) {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });

        // Filter except ids
        let exceptIds = filter.getAsObject('except_ids');
        if (_.isString(exceptIds))
            exceptIds = exceptIds.split(',');
        if (_.isArray(exceptIds))
            criteria.push({ _id: { $nin: exceptIds } });

        // Filter roles
        let roles = filter.getAsObject('roles');
        if (_.isString(roles))
            roles = roles.split(',');
        if (_.isArray(roles))
            criteria.push({ roles: { $in: roles } });

        // Filter except roles
        let exceptRoles = filter.getAsObject('except_roles');
        if (_.isString(exceptRoles))
            exceptRoles = exceptRoles.split(',');
        if (_.isArray(exceptRoles))
            criteria.push({ roles: { $nin: exceptRoles } });

        return criteria.length > 0 ? { $and: criteria } : null;
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
