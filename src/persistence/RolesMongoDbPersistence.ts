let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { IRolesPersistence } from './IRolesPersistence';

export class RolesMongoDbPersistence extends MongoDbPersistence implements IRolesPersistence {
	/**
	 * Unique descriptor for the RolesMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-roles", "mongodb", "*"
	);

    constructor() {
        super(RolesMongoDbPersistence.Descriptor, require('./UserRoleModel'));
    }
        
    public getRoles(correlationId: string, userId: string, callback) {
        this._model.findById(
            userId, 
            (err, item) => {
                let roles = item ? item.roles : [];
                roles = _.map(roles, (role) => this.jsonToPublic(role));
                callback(err, roles);
            }
        );
    }

    public setRoles(correlationId: string, userId: string, roles: string[], callback) {
        this._model.findByIdAndUpdate(
            userId,
            {
                $set: {
                    roles: roles,
                    updated: new Date()
                }
            },
            {
                'new': true,
                upsert: true
            },
            (err, item) => {
                let roles = item ? item.roles : []; 
                roles = _.map(roles, (role) => this.jsonToPublic(role));
                callback(err, roles);
            }
        );
    }

}
