import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesController } from './IRolesController';

export class RolesCommandSet extends CommandSet {
    private _logic: IRolesController;

    constructor(logic: IRolesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetRolesCommand());
		this.addCommand(this.makeSetRolesCommand());
		this.addCommand(this.makeGrantRolesCommand());
		this.addCommand(this.makeRevokeRolesCommand());
		this.addCommand(this.makeAuthorizeCommand());
    }

	private makeGetRolesCommand(): ICommand {
		return new Command(
			"get_roles",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.getRoles(correlationId, userId, callback);
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