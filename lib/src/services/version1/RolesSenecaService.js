"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var RolesSenecaService = (function (_super) {
    __extends(RolesSenecaService, _super);
    function RolesSenecaService() {
        _super.call(this, RolesSenecaService.Descriptor);
    }
    RolesSenecaService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-roles", "*", "*"));
        _super.prototype.link.call(this, components);
        this.registerCommands('roles', this._logic.getCommands());
    };
    /**
     * Unique descriptor for the RolesSenecaService component
     */
    RolesSenecaService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-roles", "seneca", "1.0");
    return RolesSenecaService;
}(pip_services_runtime_node_3.SenecaService));
exports.RolesSenecaService = RolesSenecaService;
