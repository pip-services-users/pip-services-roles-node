import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let UserRolesMongoDbSchema = function(collection?: string) {
    collection = collection || 'user_roles';

    let schema = new Schema(
        {
            _id: { type: String, unique: true },
            roles: { type: [String], required: false },
            updated: { type: Date, required: true, 'default': Date.now },
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema
}
