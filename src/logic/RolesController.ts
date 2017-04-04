let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from '../persistence/IRolesPersistence';
import { IRolesBusinessLogic } from './IRolesBusinessLogic';
import { RolesCommandSet } from './RolesCommandSet';

export class RolesController implements IConfigurable, IReferenceable, ICommandable, IRolesBusinessLogic {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-roles:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(RolesController._defaultConfig);
    private _persistence: IRolesPersistence;
    private _commandSet: RolesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IRolesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new RolesCommandSet(this);
        return this._commandSet;
    }
    
    public getRoles(correlationId: string, userId: string,
        callback: (err: any, roles: string[]) => void): void {
        this._persistence.getOneById(correlationId, userId, (err, roles) => {
            callback(err, roles ? roles.roles : null);
        });
    }

    public setRoles(correlationId: string, userId: string, roles: string[],
        callback?: (err: any, roles: string[]) => void): void {
        let item = new UserRolesV1(userId, roles);
        this._persistence.set(correlationId, item, (err, roles) => {
            if (callback) callback(err, roles ? roles.roles : null);
        });
    }

    public grantRoles(correlationId: string, userId: string, roles: string[],
        callback: (err: any, roles: string[]) => void): void {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback) callback(null, null);
            return;
        }

        this.getRoles(
            correlationId, 
            userId,
            (err, existingRoles) => {
                if (err) {
                    callback(err, null);
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

    public revokeRoles(correlationId: string, userId: string, roles: string[],
        callback: (err: any, roles: string[]) => void): void {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            if (callback) callback(null, null);
            return;
        }

        this.getRoles(
            correlationId, 
            userId,
            (err, existingRoles) => {
                if (err) {
                    callback(err, null);
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
    
    public authorize(correlationId: string, userId: string, roles: string[],
        callback: (err: any, authorized: boolean) => void): void {
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
                    callback(err, false);
                    return;
                }
                
                let authorized = _.difference(roles, existingRoles).length == 0;
                                
                callback(null, authorized);
            }
        );
    }
        
}
