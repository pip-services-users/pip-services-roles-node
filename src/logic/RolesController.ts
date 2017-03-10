let _ = require('lodash');

import { DynamicMap } from 'pip-services-runtime-node';
import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';

import { IRolesPersistence } from '../persistence/IRolesPersistence';
import { IRolesBusinessLogic } from './IRolesBusinessLogic';
import { RolesCommandSet } from './RolesCommandSet';

export class RolesController extends AbstractController implements IRolesBusinessLogic {
	/**
	 * Unique descriptor for the RolesController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-roles", "*", "*"
	);
    
	private _db: IRolesPersistence;
    
    constructor() {
        super(RolesController.Descriptor);
    }

    public link(components: ComponentSet): void {
        // Locate reference to tags persistence component
        this._db = <IRolesPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-roles", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new RolesCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getRoles(correlationId: string, userId: string, callback) {
        callback = this.instrument(correlationId, 'roles.get_roles', callback);
        this._db.getRoles(correlationId, userId, callback);
    }

    public setRoles(correlationId: string, userId: string, roles: string[], callback) {
        callback = this.instrument(correlationId, 'roles.set_roles', callback);
        this._db.setRoles(correlationId, userId, roles, callback);
    }

    public grantRoles(correlationId: string, userId: string, roles: string[], callback) {
        callback = this.instrument(correlationId, 'roles.grant_role', callback);

        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback) callback();
            return;
        }

        this.getRoles(
            correlationId, 
            userId,
            (err, existingRoles) => {
                if (err) {
                    callback(err);
                    return;
                }

                let newRoles = _.union(roles, existingRoles);

                this.setRoles(
                    correlationId, 
                    userId,
                    newRoles,
                    callback
                )
            }
        );
    }

    public revokeRoles(correlationId: string, userId: string, roles: string[], callback) {
        callback = this.instrument(correlationId, 'roles.revoke_role', callback);

        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback) callback();
            return;
        }

        this.getRoles(
            correlationId, 
            userId,
            (err, existingRoles) => {
                if (err) {
                    callback(err);
                    return;
                }

                let newRoles = _.difference(existingRoles, roles);

                this.setRoles(
                    correlationId, 
                    userId,
                    newRoles,
                    callback
                )
            }
        );
    }
    
    public authorize(correlationId: string, userId: string, roles: string[], callback) {
        callback = this.instrument(correlationId, 'roles.authorize', callback);

        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback) callback(null, true);
            return;
        }

        this.getRoles(
            correlationId, 
            userId,
            (err, existingRoles) => {
                if (err) {
                    callback(err);
                    return;
                }
                
                let authorized = _.difference(roles, existingRoles).length == 0;
                                
                callback(null, authorized);
            }
        );
    }
        
}
