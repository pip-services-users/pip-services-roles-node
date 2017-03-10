"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var RolesMemoryPersistence_1 = require('../../src/persistence/RolesMemoryPersistence');
var RolesPersistenceFixture_1 = require('./RolesPersistenceFixture');
suite('RolesMemoryPersistence', function () {
    var db, fixture;
    suiteSetup(function (done) {
        db = new RolesMemoryPersistence_1.RolesMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
        fixture = new RolesPersistenceFixture_1.RolesPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Get and Set Roles', function (done) {
        fixture.testGetAndSetRoles(done);
    });
});
