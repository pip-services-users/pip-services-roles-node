let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { RolesMemoryPersistence } from '../../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../../src/logic/RolesController';
import { RolesSenecaServiceV1 } from '../../../src/services/version1/RolesSenecaServiceV1';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesSenecaServiceV1', ()=> {
    let seneca: any;
    let service: RolesSenecaServiceV1;
    let persistence: RolesMemoryPersistence;
    let controller: RolesController;

    suiteSetup((done) => {
        persistence = new RolesMemoryPersistence();
        controller = new RolesController();

        service = new RolesSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-roles', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-roles', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('Get and Set Roles', (done) => {
        async.series([
        // Set party roles
            (callback) => {
                seneca.act(
                    {
                        role: 'roles',
                        cmd: 'set_roles',
                        user_id: '1',
                        roles: ROLES
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                seneca.act(
                    {
                        role: 'roles',
                        cmd: 'get_roles_by_id',
                        user_id: '1'
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Grant and Revoke Roles', (done) => {
        async.series([
        // Grant roles first time
            (callback) => {
                seneca.act(
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
                seneca.act(
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
                seneca.act(
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
                seneca.act(
                    {
                        role: 'roles',
                        cmd: 'get_roles_by_id',
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
                seneca.act(
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

    test('Authorize', (done) => {
        async.series([
        // Grant roles
            (callback) => {
                seneca.act(
                    {
                        role: 'roles',
                        cmd: 'grant_roles',
                        user_id: '1',
                        roles: ['Role_1', 'Role_2']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);

                        callback(err);
                    }
                );
            },
        // Authorize positively
            (callback) => {
                seneca.act(
                    {
                        role: 'roles',
                        cmd: 'authorize',
                        user_id: '1',
                        roles: ['Role_1']
                    },
                    (err, result) => {
                        assert.isNull(err);

                        assert.isTrue(result.authorized);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                seneca.act(
                    {
                        role: 'roles',
                        cmd: 'authorize',
                        user_id: '1',
                        roles: ['Role_2', 'Role_3']
                    },
                    (err, result) => {
                        assert.isNull(err);
                        
                        if (_.isEmpty(result)) 
                            result = false;

                        assert.isFalse(result.authorized);

                        callback(err);
                    }
                );
            }
        ], done);
    });

});