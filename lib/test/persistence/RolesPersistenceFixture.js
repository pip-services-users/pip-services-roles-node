"use strict";
var async = require('async');
var assert = require('chai').assert;
var ROLES = ['Role 1', 'Role 2', 'Role 3'];
var RolesPersistenceFixture = (function () {
    function RolesPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    RolesPersistenceFixture.prototype.testGetAndSetRoles = function (done) {
        var _this = this;
        async.series([
            // Set party roles
            function (callback) {
                _this._db.setRoles(null, '1', ROLES, function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    callback();
                });
            },
            // Read and check party roles
            function (callback) {
                _this._db.getRoles(null, '1', function (err, roles) {
                    assert.isNull(err);
                    assert.lengthOf(roles, 3);
                    callback();
                });
            }
        ], done);
    };
    return RolesPersistenceFixture;
}());
exports.RolesPersistenceFixture = RolesPersistenceFixture;
