let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { RolesMemoryPersistence } from '../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../src/logic/RolesController';

let ROLES: string[] = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesController', ()=> {        
    let db = new RolesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new RolesController();
    ctrl.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });

    test('Get and Set Roles', (done) => {
        async.series([
        // Update party roles
            (callback) => {
                ctrl.setRoles(
                    null,
                    '1',
                    ROLES,
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                ctrl.getRoles(
                    null,
                    '1',
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
                ctrl.grantRoles(
                    null,
                    '1',
                    ['Role 1'],
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
                ctrl.grantRoles(
                    null,
                    '1',
                    ['Role 1', 'Role 2', 'Role 3'],
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
                ctrl.revokeRoles(
                    null,
                    '1',
                    ['Role 1'],
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
                ctrl.getRoles(
                    null,
                    '1',
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);

                        assert.sameMembers(roles, ['Role 2', 'Role 3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                ctrl.revokeRoles(
                    null,
                    '1',
                    ['Role 1', 'Role 2'],
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
                ctrl.grantRoles(
                    null,
                    '1',
                    ['Role 1', 'Role 2'],
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);

                        callback(err);
                    }
                );
            },
        // Authorize positively
            (callback) => {
                ctrl.authorize(
                    null,
                    '1',
                    ['Role 1'],
                    (err, result) => {
                        assert.isNull(err);

                        assert.isTrue(result);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                ctrl.authorize(
                    null,
                    '1',
                    ['Role 2', 'Role 3'],
                    (err, result) => {
                        assert.isNull(err);

                        assert.isFalse(result);

                        callback(err);
                    }
                );
            }
        ], done);
    });
    
});