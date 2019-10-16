"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class RolesCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('users', 'roles');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
exports.RolesCouchbasePersistence = RolesCouchbasePersistence;
//# sourceMappingURL=RolesCouchbasePersistence.js.map