let _ = require('lodash');
let assert = require('chai').assert;

import { RolesSenecaPlugin } from '../../src/run/RolesSenecaPlugin';

let buildConfig = {
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

suite('RolesSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new RolesSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'roles',
                cmd: 'get_roles',
                user_id: '1' 
            },
            (err, roles) => {
                assert.isNull(err);
                
                assert.isArray(roles);
                                
                done();
            }
        );
    });
});