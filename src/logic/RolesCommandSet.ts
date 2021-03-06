import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesController } from './IRolesController';

export class RolesCommandSet extends CommandSet {
    private _logic: IRolesController;

    constructor(logic: IRolesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetRolesByFilterCommand());
		this.addCommand(this.makeGetRolesByIdCommand());
		this.addCommand(this.makeSetRolesCommand());
		this.addCommand(this.makeGrantRolesCommand());
		this.addCommand(this.makeRevokeRolesCommand());
		this.addCommand(this.makeAuthorizeCommand());
    }

	private makeGetRolesByFilterCommand(): ICommand {
		return new Command(
			"get_roles_by_filter",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getRolesByFilter(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetRolesByIdCommand(): ICommand {
		return new Command(
			"get_roles_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.getRolesById(correlationId, userId, callback);
            }
		);
	}

	private makeSetRolesCommand(): ICommand {
		return new Command(
			"set_roles",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                this._logic.setRoles(correlationId, userId, roles, callback);
            }
		);
	}

	private makeGrantRolesCommand(): ICommand {
		return new Command(
			"grant_roles",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                this._logic.grantRoles(correlationId, userId, roles, callback);
            }
		);
	}

	private makeRevokeRolesCommand(): ICommand {
		return new Command(
			"revoke_roles",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                this._logic.revokeRoles(correlationId, userId, roles, callback);
            }
		);
	}

	private makeAuthorizeCommand(): ICommand {
		return new Command(
			"authorize",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                this._logic.authorize(correlationId, userId, roles, (err, authorized) => {
					if (err) callback(err, null);
					else callback(null, { authorized: authorized });
				});
            }
		);
	}

}