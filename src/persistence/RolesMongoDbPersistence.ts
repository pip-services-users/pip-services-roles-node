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
