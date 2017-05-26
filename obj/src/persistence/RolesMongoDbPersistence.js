"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const UserRolesMongoDbSchema_1 = require("./UserRolesMongoDbSchema");
class RolesMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('user_roles', UserRolesMongoDbSchema_1.UserRolesMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    set(correlationId, item, callback) {
        if (item == null) {
            callback(null, null);
            return;
        }
        item = _.clone(item);
        item.update_time = new Date();
        super.set(correlationId, item, callback);
    }
}
exports.RolesMongoDbPersistence = RolesMongoDbPersistence;
//# sourceMappingURL=RolesMongoDbPersistence.js.map