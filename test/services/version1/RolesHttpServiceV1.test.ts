let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { RolesMemoryPersistence } from '../../../src/persistence/v1/rolesMemoryPersistence';
import { RolesController } from '../../../src/logic/v1/rolesController';
import { RolesHttpServiceV1 } from '../../../src/services/version1/v1/rolesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesHttpServiceV1', ()=> {
    let persistence: RolesMemoryPersistence;
    let service: RolesHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        persistence = new RolesMemoryPersistence();
        let controller = new RolesController();

        service = new RolesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-roles', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-roles', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup((done) => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });

        persistence.clear(null, done);
    });
    
    test('Get and Set Roles', (done) => {
        async.series([
        // Set party roles
            (callback) => {
                rest.post('/v1/roles/set_roles',
                    {
                        user_id: '1',
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
                rest.post('/v1/roles/get_roles_by_id',
                    {
                        user_id: '1'
                    },
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
                rest.post('/v1/roles/grant_roles',
                    { 
                        user_id: '1',
                        roles: ['Role1']
                    },
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
                rest.post('/v1/roles/grant_roles',
                    { 
                        user_id: '1',
                        roles: ['Role1', 'Role2', 'Role3']
                    },
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
                rest.post('/v1/roles/revoke_roles',
                    {
                        user_id: '1',
                        roles: ['Role1']
                    },
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
                rest.post('/v1/roles/get_roles_by_id',
                    {
                        user_id: '1'
                    },
                    (err, req, res, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                rest.post('/v1/roles/revoke_roles',
                    {
                        user_id: '1',
                        roles: ['Role1', 'Role2']
                    },
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
                rest.post('/v1/roles/grant_roles',
                    {
                        user_id: '1',
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
                rest.post('/v1/roles/authorize',
                    {
                        user_id: '1',
                        roles: ['Role_1']
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.isTrue(result.authorized);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                rest.post('/v1/roles/authorize',
                    {
                        user_id: '1',
                        roles: ['Role_2', 'Role_3']
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);
                        
                        if (_.isEmpty(result)) 
                            result = false;

                        assert.isFalse(result.authorized);

                        callback(err);
                    }
                );
            }
        ], done);
    });

});