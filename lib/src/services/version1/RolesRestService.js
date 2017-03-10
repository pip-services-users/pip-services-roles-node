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
var RolesRestService = (function (_super) {
    __extends(RolesRestService, _super);
    function RolesRestService() {
        _super.call(this, RolesRestService.Descriptor);
    }
    RolesRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-roles", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    RolesRestService.prototype.getRoles = function (req, res) {
        this._logic.getRoles(req.params.correlation_id, req.params.userId, this.sendResult(req, res));
    };
    RolesRestService.prototype.setRoles = function (req, res) {
        this._logic.setRoles(req.params.correlation_id, req.params.userId, req.body.roles, this.sendResult(req, res));
    };
    RolesRestService.prototype.grantRoles = function (req, res) {
        if (req.params.roles) {
            var roles = req.params.roles;
            if (_.isString(roles))
                roles = roles.split(',');
            this._logic.grantRoles(req.params.correlation_id, req.params.userId, roles, this.sendResult(req, res));
        }
        else {
            this._logic.grantRoles(req.params.correlation_id, req.params.userId, req.body.roles, this.sendResult(req, res));
        }
    };
    RolesRestService.prototype.revokeRoles = function (req, res) {
        if (req.params.roles) {
            var roles = req.params.roles;
            if (_.isString(roles))
                roles = roles.split(',');
            this._logic.revokeRoles(req.params.correlation_id, req.params.userId, roles, this.sendResult(req, res));
        }
        else {
            this._logic.revokeRoles(req.params.correlation_id, req.params.userId, req.body.roles, this.sendResult(req, res));
        }
    };
    RolesRestService.prototype.authorize = function (req, res) {
        var roles = req.params.roles;
        if (_.isString(roles))
            roles = roles.split(',');
        this._logic.authorize(req.params.correlation_id, req.params.userId, roles, this.sendResult(req, res));
    };
    RolesRestService.prototype.register = function () {
        this.registerRoute('get', '/roles/:userId', this.getRoles);
        this.registerRoute('post', '/roles/:userId', this.setRoles);
        this.registerRoute('put', '/roles/:userId', this.grantRoles);
        this.registerRoute('delete', '/roles/:userId', this.revokeRoles);
        this.registerRoute('get', '/roles/:userId/authorize', this.authorize);
    };
    /**
     * Unique descriptor for the RolesRestService component
     */
    RolesRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-roles", "rest", "1.0");
    return RolesRestService;
}(pip_services_runtime_node_3.RestService));
exports.RolesRestService = RolesRestService;
