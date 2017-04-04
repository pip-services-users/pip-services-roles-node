"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
const UserRolesMongoDbSchema_1 = require("./UserRolesMongoDbSchema");
class RolesMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('user_roles', UserRolesMongoDbSchema_1.UserRolesMongoDbSchema());
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