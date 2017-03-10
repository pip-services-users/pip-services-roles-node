var mongoose = require('mongoose'), Schema = mongoose.Schema, Mixed = Schema.Types.Mixed, UserRoleSchema = new Schema({
    _id: { type: String, unique: true },
    roles: { type: [String], required: false },
    updated: { type: Date, required: true, 'default': Date.now },
}, {
    collection: 'user_roles',
    autoIndex: true,
    strict: true
});
UserRoleSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.user_id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
module.exports = function (connection) {
    return connection.model('UserRole', UserRoleSchema);
};
