"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var RolesMemoryPersistence_1 = require('../../../src/persistence/RolesMemoryPersistence');
var RolesController_1 = require('../../../src/logic/RolesController');
var RolesSenecaService_1 = require('../../../src/services/version1/RolesSenecaService');
var ROLES = ['Role 1', 'Role 2', 'Role 3'];
suite('RolesSenecaService', function () {
    var db = new RolesMemoryPersistence_1.RolesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new RolesController_1.RolesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new RolesSenecaService_1.RolesSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Get and Set Roles', function (done) {
        async.series([
            // Update party roles
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'set_roles',
                    user_id: '1',
                    roles: ROLES
                }, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    callback();
                });
            },
            // Read and check party roles
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'get_roles',
                    user_id: '1'
                }, function (err, roles) {
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
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'grant_roles',
                    user_id: '1',
                    roles: ['Role 1']
                }, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 1);
                    assert.sameMembers(roles, ['Role 1']);
                    callback(err);
                });
            },
            // Grant roles second time
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'grant_roles',
                    user_id: '1',
                    roles: ['Role 1', 'Role 2', 'Role 3']
                }, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    assert.sameMembers(roles, ['Role 1', 'Role 2', 'Role 3']);
                    callback(err);
                });
            },
            // Revoke roles first time
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'revoke_roles',
                    user_id: '1',
                    roles: ['Role 1']
                }, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    assert.sameMembers(roles, ['Role 2', 'Role 3']);
                    callback(err);
                });
            },
            // Get roles
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'get_roles',
                    user_id: '1'
                }, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    assert.sameMembers(roles, ['Role 2', 'Role 3']);
                    callback(err);
                });
            },
            // Revoke roles second time
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'revoke_roles',
                    user_id: '1',
                    roles: ['Role 1', 'Role 2']
                }, function (err, roles) {
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
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'grant_roles',
                    user_id: '1',
                    roles: ['Role 1', 'Role 2']
                }, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    callback(err);
                });
            },
            // Authorize positively
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'authorize',
                    user_id: '1',
                    roles: ['Role 1']
                }, function (err, result) {
                    assert.isNull(err);
                    assert.isObject(result);
                    assert.isTrue(result.authorized);
                    callback(err);
                });
            },
            // Authorize negatively
            function (callback) {
                seneca.getSeneca().act({
                    role: 'roles',
                    cmd: 'authorize',
                    user_id: '1',
                    roles: ['Role 2', 'Role 3']
                }, function (err, result) {
                    assert.isNull(err);
                    assert.isObject(result);
                    assert.isFalse(result.authorized);
                    callback(err);
                });
            }
        ], done);
    });
});
