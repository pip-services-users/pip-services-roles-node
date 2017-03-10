"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var RolesMemoryPersistence_1 = require('../../../src/persistence/RolesMemoryPersistence');
var RolesController_1 = require('../../../src/logic/RolesController');
var RolesRestService_1 = require('../../../src/services/version1/RolesRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
var ROLES = ['Role1', 'Role2', 'Role3'];
suite('RolesRestService', function () {
    var db = new RolesMemoryPersistence_1.RolesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new RolesController_1.RolesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new RolesRestService_1.RolesRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
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
            // Set party roles
            function (callback) {
                rest.post('/roles/1', {
                    roles: ROLES
                }, function (err, req, res, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    callback();
                });
            },
            // Read and check party roles
            function (callback) {
                rest.get('/roles/1', function (err, req, res, roles) {
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
                rest.put('/roles/1', { roles: 'Role1' }, function (err, req, res, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 1);
                    assert.sameMembers(roles, ['Role1']);
                    callback(err);
                });
            },
            // Grant roles second time
            function (callback) {
                rest.put('/roles/1?roles=Role1,Role2,Role3', {}, function (err, req, res, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);
                    callback(err);
                });
            },
            // Revoke roles first time
            function (callback) {
                rest.del('/roles/1?roles=Role1', function (err, req, res, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    assert.sameMembers(roles, ['Role2', 'Role3']);
                    callback(err);
                });
            },
            // Get roles
            function (callback) {
                rest.get('/roles/1', function (err, req, res, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    assert.sameMembers(roles, ['Role2', 'Role3']);
                    callback(err);
                });
            },
            // Revoke roles second time
            function (callback) {
                rest.del('/roles/1?roles=Role1,Role2', function (err, req, res, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 1);
                    assert.sameMembers(roles, ['Role3']);
                    callback(err);
                });
            }
        ], done);
    });
    test('Authorize', function (done) {
        async.series([
            // Grant roles
            function (callback) {
                rest.put('/roles/1', {
                    roles: ['Role_1', 'Role_2']
                }, function (err, req, res, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 2);
                    callback(err);
                });
            },
            // Authorize positively
            function (callback) {
                rest.get('/roles/1/authorize?roles=Role_1', function (err, req, res, result) {
                    assert.isNull(err);
                    assert.isTrue(result);
                    callback(err);
                });
            },
            // Authorize negatively
            function (callback) {
                rest.get('/roles/1/authorize?roles=Role_2,Role_3', function (err, req, res, result) {
                    assert.isNull(err);
                    if (_.isEmpty(result))
                        result = false;
                    assert.isFalse(result);
                    callback(err);
                });
            }
        ], done);
    });
});
