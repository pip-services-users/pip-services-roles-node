"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
class RolesCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetRolesCommand());
        this.addCommand(this.makeSetRolesCommand());
        this.addCommand(this.makeGrantRolesCommand());
        this.addCommand(this.makeRevokeRolesCommand());
        this.addCommand(this.makeAuthorizeCommand());
    }
    makeGetRolesCommand() {
        return new pip_services_commons_node_2.Command("get_roles", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services_commons_node_5.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            this._logic.getRoles(correlationId, userId, callback);
        });
    }
    makeSetRolesCommand() {
        return new pip_services_commons_node_2.Command("set_roles", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services_commons_node_5.TypeCode.String)
            .withRequiredProperty('roles', new pip_services_commons_node_4.ArraySchema(pip_services_commons_node_5.TypeCode.String)), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            this._logic.setRoles(correlationId, userId, roles, callback);
        });
    }
    makeGrantRolesCommand() {
        return new pip_services_commons_node_2.Command("grant_roles", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services_commons_node_5.TypeCode.String)
            .withRequiredProperty('roles', new pip_services_commons_node_4.ArraySchema(pip_services_commons_node_5.TypeCode.String)), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            this._logic.grantRoles(correlationId, userId, roles, callback);
        });
    }
    makeRevokeRolesCommand() {
        return new pip_services_commons_node_2.Command("revoke_roles", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services_commons_node_5.TypeCode.String)
            .withRequiredProperty('roles', new pip_services_commons_node_4.ArraySchema(pip_services_commons_node_5.TypeCode.String)), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            this._logic.revokeRoles(correlationId, userId, roles, callback);
        });
    }
    makeAuthorizeCommand() {
        return new pip_services_commons_node_2.Command("authorize", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services_commons_node_5.TypeCode.String)
            .withRequiredProperty('roles', new pip_services_commons_node_4.ArraySchema(pip_services_commons_node_5.TypeCode.String)), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            this._logic.authorize(correlationId, userId, roles, (err, authorized) => {
                if (err)
                    callback(err, null);
                else
                    callback(null, { authorized: authorized });
            });
        });
    }
}
exports.RolesCommandSet = RolesCommandSet;
//# sourceMappingURL=RolesCommandSet.js.map