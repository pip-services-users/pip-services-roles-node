"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.UserRolesMongoDbSchema = function (collection) {
    collection = collection || 'user_roles';
    let schema = new mongoose_1.Schema({
        _id: { type: String, unique: true },
        roles: { type: [String], required: false },
        updated: { type: Date, required: true, 'default': Date.now },
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=UserRolesMongoDbSchema.js.map