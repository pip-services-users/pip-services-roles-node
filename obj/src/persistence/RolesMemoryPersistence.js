"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
class RolesMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
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
exports.RolesMemoryPersistence = RolesMemoryPersistence;
//# sourceMappingURL=RolesMemoryPersistence.js.map