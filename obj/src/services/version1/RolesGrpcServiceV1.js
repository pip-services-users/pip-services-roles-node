"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/roles_v1_grpc_pb');
let messages = require('../../../../src/protos/roles_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const RolesGrpcConverterV1_1 = require("./RolesGrpcConverterV1");
class RolesGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.RolesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-roles", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getRolesByFilter(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_2.FilterParams();
        RolesGrpcConverterV1_1.RolesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getRolesByFilter(correlationId, filter, paging, (err, result) => {
            let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
            let page = err == null ? RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromUserRolesPage(result) : null;
            let response = new messages.RolesPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getRolesById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        this._controller.getRolesById(correlationId, userId, (err, roles) => {
            let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
            let response = new messages.RolesReply();
            response.setError(error);
            response.setRolesList(roles);
            callback(err, response);
        });
    }
    setRoles(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();
        this._controller.setRoles(correlationId, userId, roles, (err, roles) => {
            let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
            let response = new messages.RolesReply();
            response.setError(error);
            if (roles)
                response.setRolesList(roles);
            callback(err, response);
        });
    }
    grantRoles(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();
        this._controller.grantRoles(correlationId, userId, roles, (err, roles) => {
            let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
            let response = new messages.RolesReply();
            response.setError(error);
            if (roles)
                response.setRolesList(roles);
            callback(err, response);
        });
    }
    revokeRoles(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();
        this._controller.revokeRoles(correlationId, userId, roles, (err, roles) => {
            let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
            let response = new messages.RolesReply();
            response.setError(error);
            if (roles)
                response.setRolesList(roles);
            callback(err, response);
        });
    }
    authorize(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();
        this._controller.authorize(correlationId, userId, roles, (err, authorized) => {
            let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
            let response = new messages.AuthorizeReply();
            response.setError(error);
            response.setAuthorized(authorized);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_roles_by_filter', null, this.getRolesByFilter);
        this.registerMethod('get_roles_by_id', null, this.getRolesById);
        this.registerMethod('set_roles', null, this.setRoles);
        this.registerMethod('grant_roles', null, this.grantRoles);
        this.registerMethod('revoke_roles', null, this.revokeRoles);
        this.registerMethod('authorize', null, this.authorize);
    }
}
exports.RolesGrpcServiceV1 = RolesGrpcServiceV1;
//# sourceMappingURL=RolesGrpcServiceV1.js.map