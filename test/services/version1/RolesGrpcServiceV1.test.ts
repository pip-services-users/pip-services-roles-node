let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/roles_v1_grpc_pb');
let messages = require('../../../../src/protos/roles_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { UserRolesV1 } from '../../../src/data/version1/UserRolesV1';
import { RolesMemoryPersistence } from '../../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../../src/logic/RolesController';
import { RolesGrpcServiceV1 } from '../../../src/services/version1/RolesGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesGrpcServiceV1', ()=> {
    let service: RolesGrpcServiceV1;
    let persistence: RolesMemoryPersistence;

    let client: any;

    suiteSetup((done) => {
        persistence = new RolesMemoryPersistence();
        let controller = new RolesController();

        service = new RolesGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-roles', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-roles', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup((done) => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/roles_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).roles_v1.Roles;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        persistence.clear(null, done);
    });

    test('Get and Set Roles', (done) => {
        async.series([
        // Set party roles
            (callback) => {
                client.set_roles(
                    {
                        user_id: '1',
                        roles: ROLES
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                client.get_roles_by_id(
                    {
                        user_id: '1'
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

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
                client.grant_roles(
                    {
                        user_id: '1',
                        roles: ['Role1']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role1']);

                        callback(err);
                    }
                );
            },
        // Grant roles second time
            (callback) => {
                client.grant_roles(
                    {
                        user_id: '1',
                        roles: ['Role1', 'Role2', 'Role3']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);
                        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Revoke roles first time
            (callback) => {
                client.revoke_roles(
                    {
                        user_id: '1',
                        roles: ['Role1']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Get roles
            (callback) => {
                client.get_roles_by_id(
                    {
                        user_id: '1'
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

                        assert.isNull(err);

                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                client.revoke_roles(
                    {
                        user_id: '1',
                        roles: ['Role1', 'Role2']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

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
                client.grant_roles(
                    {
                        user_id: '1',
                        roles: ['Role_1', 'Role_2']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let roles = response ? response.roles : null;

                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);

                        callback(err);
                    }
                );
            },
        // Authorize positively
            (callback) => {
                client.authorize(
                    {
                        user_id: '1',
                        roles: ['Role_1']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let authorized = response ? response.authorized : null;

                        assert.isNull(err);

                        assert.isTrue(authorized);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                client.authorize(
                    {
                        user_id: '1',
                        roles: ['Role_2', 'Role_3']
                    },
                    (err, response) => {
                        err = err || response.error;
                        let authorized = response ? response.authorized : null;

                        assert.isNull(err);

                        assert.isFalse(authorized);

                        callback(err);
                    }
                );
            }
        ], done);
    });

});
