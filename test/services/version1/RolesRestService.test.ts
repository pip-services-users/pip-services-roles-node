let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { RolesMemoryPersistence } from '../../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../../src/logic/RolesController';
import { RolesRestService } from '../../../src/services/version1/RolesRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

let ROLES = ['Role1', 'Role2', 'Role3'];

suite('RolesRestService', ()=> {    
    let db = new RolesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new RolesController();
    ctrl.configure(new ComponentConfig());

    let service = new RolesRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Get and Set Roles', (done) => {
        async.series([
        // Set party roles
            (callback) => {
                rest.post('/roles/1',
                    {
                        roles: ROLES
                    },
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                rest.get('/roles/1',
                    (err, req, res, roles) => {
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
                rest.put('/roles/1',
                    { roles: 'Role1' },
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role1']);

                        callback(err);
                    }
                );
            },
        // Grant roles second time
            (callback) => {
                rest.put('/roles/1?roles=Role1,Role2,Role3',
                    {},
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);
                        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Revoke roles first time
            (callback) => {
                rest.del('/roles/1?roles=Role1',
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Get roles
            (callback) => {
                rest.get('/roles/1',
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                rest.del('/roles/1?roles=Role1,Role2',
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role3']);

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
                rest.put('/roles/1',
                    {
                        roles: ['Role_1', 'Role_2']
                    },
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);

                        callback(err);
                    }
                );
            },
        // Authorize positively
            (callback) => {
                rest.get('/roles/1/authorize?roles=Role_1',
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.isTrue(result);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                rest.get('/roles/1/authorize?roles=Role_2,Role_3',
                    (err, req, res, result) => {
                        assert.isNull(err);
                        
                        if (_.isEmpty(result)) 
                            result = false;

                        assert.isFalse(result);

                        callback(err);
                    }
                );
            }
        ], done);
    });

});