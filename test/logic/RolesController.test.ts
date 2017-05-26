let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { RolesMemoryPersistence } from '../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../src/logic/RolesController';

let ROLES: string[] = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesController', ()=> {
    let controller: RolesController;

    setup(() => {
        let persistence = new RolesMemoryPersistence();
        controller = new RolesController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-roles', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });

    test('Get and Set Roles', (done) => {
        async.series([
        // Update party roles
            (callback) => {
                controller.setRoles(
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
                controller.getRolesById(
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
                controller.grantRoles(
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
                controller.grantRoles(
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
                controller.revokeRoles(
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
                controller.getRolesById(
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
                controller.revokeRoles(
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
                controller.grantRoles(
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
                controller.authorize(
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
                controller.authorize(
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