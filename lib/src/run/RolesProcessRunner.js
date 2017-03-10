"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var RolesMicroservice_1 = require('./RolesMicroservice');
/**
 * Roles process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-25
 */
var RolesProcessRunner = (function (_super) {
    __extends(RolesProcessRunner, _super);
    /**
     * Creates instance of roles process runner
     */
    function RolesProcessRunner() {
        _super.call(this, new RolesMicroservice_1.RolesMicroservice());
    }
    return RolesProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.RolesProcessRunner = RolesProcessRunner;
