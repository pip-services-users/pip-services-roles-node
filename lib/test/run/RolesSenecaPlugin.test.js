"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var RolesSenecaPlugin_1 = require('../../src/run/RolesSenecaPlugin');
var buildConfig = {
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};
suite('RolesSenecaPlugin', function () {
    var seneca;
    var plugin = new RolesSenecaPlugin_1.RolesSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'roles',
            cmd: 'get_roles',
            user_id: '1'
        }, function (err, roles) {
            assert.isNull(err);
            assert.isArray(roles);
            done();
        });
    });
});
