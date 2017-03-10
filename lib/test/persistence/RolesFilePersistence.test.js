"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var RolesFilePersistence_1 = require('../../src/persistence/RolesFilePersistence');
var RolesPersistenceFixture_1 = require('./RolesPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/roles.test.json',
        data: []
    }
});
suite('RolesFilePersistence', function () {
    var db, fixture;
    suiteSetup(function (done) {
        db = new RolesFilePersistence_1.RolesFilePersistence();
        db.configure(config);
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
