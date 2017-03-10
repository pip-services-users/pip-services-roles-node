"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var RolesMemoryPersistence_1 = require('../../src/persistence/RolesMemoryPersistence');
var RolesController_1 = require('../../src/logic/RolesController');
var ROLES = ['Role 1', 'Role 2', 'Role 3'];
suite('RolesController', function () {
    var db = new RolesMemoryPersistence_1.RolesMemoryPersistence();
    db.configure(new pip_services_runtime_node_1.ComponentConfig());
    var ctrl = new RolesController_1.RolesController();
    ctrl.configure(new pip_services_runtime_node_1.ComponentConfig());
    var components = pip_services_runtime_node_2.ComponentSet.fromComponents(db, ctrl);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Get and Set Roles', function (done) {
        async.series([
            // Update party roles
            function (callback) {
                ctrl.setRoles(null, '1', ROLES, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    callback();
                });
            },
            // Read and check party roles
            function (callback) {
                ctrl.getRoles(null, '1', function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    callback();
                });
            }
        ], done);
    });
    test('Grant and Revoke Roles', function (done) {
        async.series([
            // Grant roles first time
            function (callback) {
                ctrl.grantRoles(null, '1', ['Role 1'], function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 1);
                    assert.sameMembers(roles, ['Role 1']);
                    callback(err);
                });
            },
            // Grant roles second time
            function (callback) {
                ctrl.grantRoles(null, '1', ['Role 1', 'Role 2', 'Role 3'], function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    assert.sameMembers(roles, ['Role 1', 'Role 2', 'Role 3']);
                    callback(err);
                });
            },
            // Revoke roles first time
            function (callback) {
                ctrl.revokeRoles(null, '1', ['Role 1'], function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    assert.sameMembers(roles, ['Role 2', 'Role 3']);
                    callback(err);
                });
            },
            // Get roles
            function (callback) {
                ctrl.getRoles(null, '1', function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    assert.sameMembers(roles, ['Role 2', 'Role 3']);
                    callback(err);
                });
            },
            // Revoke roles second time
            function (callback) {
                ctrl.revokeRoles(null, '1', ['Role 1', 'Role 2'], function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 1);
                    assert.sameMembers(roles, ['Role 3']);
                    callback(err);
                });
            }
        ], done);
    });
    test('Authorize', function (done) {
        async.series([
            // Grant roles
            function (callback) {
                ctrl.grantRoles(null, '1', ['Role 1', 'Role 2'], function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    callback(err);
                });
            },
            // Authorize positively
            function (callback) {
                ctrl.authorize(null, '1', ['Role 1'], function (err, result) {
                    assert.isNull(err);
                    assert.isTrue(result);
                    callback(err);
                });
            },
            // Authorize negatively
            function (callback) {
                ctrl.authorize(null, '1', ['Role 2', 'Role 3'], function (err, result) {
                    assert.isNull(err);
                    assert.isFalse(result);
                    callback(err);
                });
            }
        ], done);
    });
});
