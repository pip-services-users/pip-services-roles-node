import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
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
			"get_roles",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.getRoles(correlationId, userId, callback);
            }
		);
	}

	private makeSetRolesCommand(): ICommand {
		return new Command(
			"set_roles",
			null,
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
			null,
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
			null,
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
			null,
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