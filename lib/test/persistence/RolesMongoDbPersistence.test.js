"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var RolesMongoDbPersistence_1 = require('../../src/persistence/RolesMongoDbPersistence');
var RolesPersistenceFixture_1 = require('./RolesPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('RolesMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new RolesMongoDbPersistence_1.RolesMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new RolesPersistenceFixture_1.RolesPersistenceFixture(db);
    suiteSetup(function (done) {
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
