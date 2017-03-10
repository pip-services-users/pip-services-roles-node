"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var RolesCommandSet = (function (_super) {
    __extends(RolesCommandSet, _super);
    function RolesCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetRolesCommand());
        this.addCommand(this.makeSetRolesCommand());
        this.addCommand(this.makeGrantRolesCommand());
        this.addCommand(this.makeRevokeRolesCommand());
        this.addCommand(this.makeAuthorizeCommand());
    }
    RolesCommandSet.prototype.makeGetRolesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_roles", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            _this._logic.getRoles(correlationId, userId, callback);
        });
    };
    RolesCommandSet.prototype.makeSetRolesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "set_roles", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withArray("roles", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var roles = args.getArray("roles");
            _this._logic.setRoles(correlationId, userId, roles, callback);
        });
    };
    RolesCommandSet.prototype.makeGrantRolesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "grant_roles", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withArray("roles", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var roles = args.getArray("roles");
            _this._logic.grantRoles(correlationId, userId, roles, callback);
        });
    };
    RolesCommandSet.prototype.makeRevokeRolesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "revoke_roles", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withArray("roles", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var roles = args.getArray("roles");
            _this._logic.revokeRoles(correlationId, userId, roles, callback);
        });
    };
    RolesCommandSet.prototype.makeAuthorizeCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "authorize", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withArray("roles", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var roles = args.getArray("roles");
            _this._logic.authorize(correlationId, userId, roles, function (err, authorized) {
                if (err)
                    callback(err, null);
                else
                    callback(null, { authorized: authorized });
            });
        });
    };
    return RolesCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.RolesCommandSet = RolesCommandSet;
