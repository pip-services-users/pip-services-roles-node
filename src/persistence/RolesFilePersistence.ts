let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { IRolesPersistence } from './IRolesPersistence';

export class RolesFilePersistence extends FilePersistence implements IRolesPersistence {
	/**
	 * Unique descriptor for the RolesFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-roles", "file", "*"
	);

    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || RolesFilePersistence.Descriptor);
    }
        
    public getRoles(correlationId: string, userId: string, callback) {
        this.getById(userId, (err, item) => {
            let roles = item ? item.roles : [];
            roles = roles || [];  
            callback(err, roles);
        });
    }

    public setRoles(correlationId: string, userId: string, roles: string[], callback: any) {
        this.getById(userId, (err, item) => {
            if (err) {
                callback(err, null);
                return;
            } 
                        
            if (item == null) {
                item = {
                    id: userId
                };               
                this._items.push(item);
            }
            
            item.roles = roles;
            item.updated = new Date();
                       
            this.save((err) => {
                 if (err) callback(err);
                 else callback(null, roles);
            });
        });
    }

}
