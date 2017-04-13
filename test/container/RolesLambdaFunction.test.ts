let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { RolesMemoryPersistence } from '../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../src/logic/RolesController';
import { RolesLambdaFunction } from '../../src/container/RolesLambdaFunction';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesLambdaFunction', ()=> {
    let lambda: RolesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-roles:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-roles:controller:default:default:1.0'
        );

        lambda = new RolesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Grant and Revoke Roles', (done) => {
        async.series([
        // Grant roles first time
            (callback) => {
                lambda.act(
                    { 
                        role: 'roles',
                        cmd: 'grant_roles',
                        user_id: '1',
                        roles: ['Role1']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role1']);

                        callback(err);
                    }
                );
            },
        // Grant roles second time
            (callback) => {
                lambda.act(
                    { 
                        role: 'roles',
                        cmd: 'grant_roles',
                        user_id: '1',
                        roles: ['Role1', 'Role2', 'Role3']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);
                        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Revoke roles first time
            (callback) => {
                lambda.act(
                    {
                        role: 'roles',
                        cmd: 'revoke_roles',
                        user_id: '1',
                        roles: ['Role1']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Get roles
            (callback) => {
                lambda.act(
                    {
                        role: 'roles',
                        cmd: 'get_roles',
                        user_id: '1'
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                lambda.act(
                    {
                        role: 'roles',
                        cmd: 'revoke_roles',
                        user_id: '1',
                        roles: ['Role1', 'Role2']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role3']);

                        callback(err);
                    }
                );
            }
        ], done);

    });

});