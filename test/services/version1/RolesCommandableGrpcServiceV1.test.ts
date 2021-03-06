let _ = require('lodash');
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
import { RolesCommandableGrpcServiceV1 } from '../../../src/services/version1/RolesCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesCommandableGrpcServiceV1', ()=> {
    let service: RolesCommandableGrpcServiceV1;
    let persistence: RolesMemoryPersistence;

    let client: any;

    suiteSetup((done) => {
        persistence = new RolesMemoryPersistence();
        let controller = new RolesController();

        service = new RolesCommandableGrpcServiceV1();
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
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        persistence.clear(null, done);
    });

    test('Get and Set Roles', (done) => {
        async.series([
        // Set party roles
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.set_roles',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ROLES
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.get_roles_by_id',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1'
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);
                        
                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);

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
                client.invoke(
                    {
                        method: 'v1/roles.grant_roles',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ['Role1']
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);
                        
                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);

                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role1']);

                        callback(err);
                    }
                );
            },
        // Grant roles second time
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.grant_roles',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ['Role1', 'Role2', 'Role3']
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);
                        
                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);

                        assert.lengthOf(roles, 3);
                        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Revoke roles first time
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.revoke_roles',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ['Role1']
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    }
                );
            },
        // Get roles
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.get_roles_by_id',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1'
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);
                        
                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);

                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role2', 'Role3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.revoke_roles',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ['Role1', 'Role2']
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);
                        
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
                client.invoke(
                    {
                        method: 'v1/roles.grant_roles',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ['Role_1', 'Role_2']
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);
                        
                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let roles = JSON.parse(response.result_json);

                        assert.lengthOf(roles, 2);

                        callback(err);
                    }
                );
            },
        // Authorize positively
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.authorize',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ['Role_1']
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let result = JSON.parse(response.result_json);

                        assert.isTrue(result.authorized);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/roles.authorize',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            roles: ['Role_2', 'Role_3']
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let result = JSON.parse(response.result_json);
                        
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
