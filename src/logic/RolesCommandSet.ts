import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { IRolesBusinessLogic } from './IRolesBusinessLogic';

export class RolesCommandSet extends CommandSet {
    private _logic: IRolesBusinessLogic;

    constructor(logic: IRolesBusinessLogic) {
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
			this._logic,
			"get_roles",
			new Schema()
				.withProperty("user_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                this._logic.getRoles(correlationId, userId, callback);
            }
		);
	}

	private makeSetRolesCommand(): ICommand {
		return new Command(
			this._logic,
			"set_roles",
			new Schema()
				.withProperty("user_id", "string")
				.withArray("roles", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let roles = args.getArray("roles");
                this._logic.setRoles(correlationId, userId, roles, callback);
            }
		);
	}

	private makeGrantRolesCommand(): ICommand {
		return new Command(
			this._logic,
			"grant_roles",
			new Schema()
				.withProperty("user_id", "string")
				.withArray("roles", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let roles = args.getArray("roles");
                this._logic.grantRoles(correlationId, userId, roles, callback);
            }
		);
	}

	private makeRevokeRolesCommand(): ICommand {
		return new Command(
			this._logic,
			"revoke_roles",
			new Schema()
				.withProperty("user_id", "string")
				.withArray("roles", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let roles = args.getArray("roles");
                this._logic.revokeRoles(correlationId, userId, roles, callback);
            }
		);
	}

	private makeAuthorizeCommand(): ICommand {
		return new Command(
			this._logic,
			"authorize",
			new Schema()
				.withProperty("user_id", "string")
				.withArray("roles", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let roles = args.getArray("roles");
                this._logic.authorize(correlationId, userId, roles, (err, authorized) => {
					if (err) callback(err, null);
					else callback(null, { authorized: authorized });
				});
            }
		);
	}

}