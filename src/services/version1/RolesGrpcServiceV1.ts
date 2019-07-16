let _ = require('lodash');
let services = require('../../../../src/protos/roles_v1_grpc_pb');
let messages = require('../../../../src/protos/roles_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { UserRolesV1 } from '../../data/version1/UserRolesV1';
import { IRolesController } from '../../logic/IRolesController';
import { RolesGrpcConverterV1 } from './RolesGrpcConverterV1';

export class RolesGrpcServiceV1 extends GrpcService {
    private _controller: IRolesController;
	
    public constructor() {
        super(services.RolesService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-roles", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IRolesController>('controller');
    }
    
    private getRolesByFilter(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        RolesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = RolesGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getRolesByFilter(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = RolesGrpcConverterV1.fromError(err);
                let page = err == null ? RolesGrpcConverterV1.fromUserRolesPage(result) : null;

                let response = new messages.RolesPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getRolesById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();

        this._controller.getRolesById(
            correlationId,
            userId,
            (err, roles) => {
                let error = RolesGrpcConverterV1.fromError(err);

                let response = new messages.RolesReply();
                response.setError(error);
                response.setRolesList(roles);

                callback(err, response);
            }
        );
    }

    private setRoles(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        this._controller.setRoles(
            correlationId,
            userId, roles,
            (err, roles) => {
                let error = RolesGrpcConverterV1.fromError(err);

                let response = new messages.RolesReply();
                response.setError(error);
                if (roles)
                    response.setRolesList(roles);

                callback(err, response);
            }
        );
    }

    private grantRoles(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        this._controller.grantRoles(
            correlationId,
            userId, roles,
            (err, roles) => {
                let error = RolesGrpcConverterV1.fromError(err);

                let response = new messages.RolesReply();
                response.setError(error);
                if (roles)
                    response.setRolesList(roles);

                callback(err, response);
            }
        );
    }

    private revokeRoles(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        this._controller.revokeRoles(
            correlationId,
            userId, roles,
            (err, roles) => {
                let error = RolesGrpcConverterV1.fromError(err);

                let response = new messages.RolesReply();
                response.setError(error);
                if (roles)
                    response.setRolesList(roles);

                callback(err, response);
            }
        );
    }

    private authorize(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        this._controller.authorize(
            correlationId,
            userId, roles,
            (err, authorized) => {
                let error = RolesGrpcConverterV1.fromError(err);

                let response = new messages.AuthorizeReply();
                response.setError(error);
                response.setAuthorized(authorized);

                callback(err, response);
            }
        );
    }
        
    public register() {
        this.registerMethod(
            'get_roles_by_filter', 
            null,
            this.getRolesByFilter
        );

        this.registerMethod(
            'get_roles_by_id', 
            null,
            this.getRolesById
        );

        this.registerMethod(
            'set_roles', 
            null,
            this.setRoles
        );

        this.registerMethod(
            'grant_roles', 
            null,
            this.grantRoles
        );

        this.registerMethod(
            'revoke_roles', 
            null,
            this.revokeRoles
        );

        this.registerMethod(
            'authorize', 
            null,
            this.authorize
        );
    }
}
