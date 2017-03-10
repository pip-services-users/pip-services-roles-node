"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var RolesMicroservice_1 = require('./RolesMicroservice');
var RolesSenecaPlugin = (function (_super) {
    __extends(RolesSenecaPlugin, _super);
    function RolesSenecaPlugin() {
        _super.call(this, 'roles', new RolesMicroservice_1.RolesMicroservice());
    }
    return RolesSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.RolesSenecaPlugin = RolesSenecaPlugin;
