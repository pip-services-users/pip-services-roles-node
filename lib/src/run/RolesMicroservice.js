"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var RolesFactory_1 = require('../build/RolesFactory');
/**
 * Roles microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-25
 */
var RolesMicroservice = (function (_super) {
    __extends(RolesMicroservice, _super);
    /**
     * Creates instance of roles microservice.
     */
    function RolesMicroservice() {
        _super.call(this, "pip-services-roles", RolesFactory_1.RolesFactory.Instance);
    }
    return RolesMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.RolesMicroservice = RolesMicroservice;
