let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { RolesMemoryPersistence } from '../../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../../src/logic/RolesController';
import { RolesSenecaService } from '../../../src/services/version1/RolesSenecaService';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesSenecaService', ()=> {        
    let db = new RolesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new RolesController();
    ctrl.configure(new ComponentConfig());

    let service = new RolesSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });

    test('Get and Set Roles', (done) => {
        async.series([
        // Update party roles
            (callback) => {
                seneca.getSeneca().act(
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
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'get_roles',
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
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'grant_roles',
                        user_id: '1',
                        roles: ['Role 1']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role 1']);

                        callback(err);
                    }
                );
            },
        // Grant roles second time
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'grant_roles',
                        user_id: '1',
                        roles: ['Role 1', 'Role 2', 'Role 3']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);
                        assert.sameMembers(roles, ['Role 1', 'Role 2', 'Role 3']);

                        callback(err);
                    }
                );
            },
        // Revoke roles first time
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'revoke_roles',
                        user_id: '1',
                        roles: ['Role 1']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role 2', 'Role 3']);

                        callback(err);
                    }
                );
            },
        // Get roles
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'get_roles',
                        user_id: '1'
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role 2', 'Role 3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'revoke_roles',
                        user_id: '1',
                        roles: ['Role 1', 'Role 2']
                    },
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role 3']);

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
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'grant_roles',
                        user_id: '1',
                        roles: ['Role 1', 'Role 2']
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
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'authorize',
                        user_id: '1',
                        roles: ['Role 1']
                    },
                    (err, result) => {
                        assert.isNull(err);
                        
                        assert.isObject(result);
                        assert.isTrue(result.authorized);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'roles',
                        cmd: 'authorize',
                        user_id: '1',
                        roles: ['Role 2', 'Role 3']
                    },
                    (err, result) => {
                        assert.isNull(err);
                        
                        assert.isObject(result);
                        assert.isFalse(result.authorized);

                        callback(err);
                    }
                );
            }
        ], done);
    });
    
});