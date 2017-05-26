let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from './IRolesPersistence';

export class RolesMemoryPersistence 
    extends IdentifiableMemoryPersistence<UserRolesV1, string> 
    implements IRolesPersistence {

    constructor() {
        super();
    }


    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        let exceptIds = filter.getAsObject('except_ids');
        let roles = filter.getAsObject('roles');
        let exceptRoles = filter.getAsObject('except_roles');
        
        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;

        // Process except ids filter
        if (_.isString(exceptIds))
            exceptIds = exceptIds.split(',');
        if (!_.isArray(exceptIds))
            exceptIds = null;

        // Process roles filter
        if (_.isString(roles))
            roles = roles.split(',');
        if (!_.isArray(roles))
            roles = null;

        // Process except roles filter
        if (_.isString(exceptRoles))
            exceptRoles = exceptRoles.split(',');
        if (!_.isArray(exceptRoles))
            exceptRoles = null;
        
        return (item) => {
            if (id && item.id != id) 
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (exceptIds && _.indexOf(exceptIds, item.id) >= 0)
                return false;
            if (roles && !this.contains(roles, item.roles))
                return false;
            if (exceptRoles && this.contains(exceptRoles, item.roles))
                return false;
            return true; 
        };
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
