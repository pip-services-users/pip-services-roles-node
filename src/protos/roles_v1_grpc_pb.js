// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var roles_v1_pb = require('./roles_v1_pb.js');

function serialize_roles_v1_AuthorizeReply(arg) {
  if (!(arg instanceof roles_v1_pb.AuthorizeReply)) {
    throw new Error('Expected argument of type roles_v1.AuthorizeReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_roles_v1_AuthorizeReply(buffer_arg) {
  return roles_v1_pb.AuthorizeReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_roles_v1_RoleIdRequest(arg) {
  if (!(arg instanceof roles_v1_pb.RoleIdRequest)) {
    throw new Error('Expected argument of type roles_v1.RoleIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_roles_v1_RoleIdRequest(buffer_arg) {
  return roles_v1_pb.RoleIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_roles_v1_RolesPageReply(arg) {
  if (!(arg instanceof roles_v1_pb.RolesPageReply)) {
    throw new Error('Expected argument of type roles_v1.RolesPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_roles_v1_RolesPageReply(buffer_arg) {
  return roles_v1_pb.RolesPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_roles_v1_RolesPageRequest(arg) {
  if (!(arg instanceof roles_v1_pb.RolesPageRequest)) {
    throw new Error('Expected argument of type roles_v1.RolesPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_roles_v1_RolesPageRequest(buffer_arg) {
  return roles_v1_pb.RolesPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_roles_v1_RolesReply(arg) {
  if (!(arg instanceof roles_v1_pb.RolesReply)) {
    throw new Error('Expected argument of type roles_v1.RolesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_roles_v1_RolesReply(buffer_arg) {
  return roles_v1_pb.RolesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_roles_v1_RolesRequest(arg) {
  if (!(arg instanceof roles_v1_pb.RolesRequest)) {
    throw new Error('Expected argument of type roles_v1.RolesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_roles_v1_RolesRequest(buffer_arg) {
  return roles_v1_pb.RolesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The roles service definition.
var RolesService = exports.RolesService = {
  get_roles_by_filter: {
    path: '/roles_v1.Roles/get_roles_by_filter',
    requestStream: false,
    responseStream: false,
    requestType: roles_v1_pb.RolesPageRequest,
    responseType: roles_v1_pb.RolesPageReply,
    requestSerialize: serialize_roles_v1_RolesPageRequest,
    requestDeserialize: deserialize_roles_v1_RolesPageRequest,
    responseSerialize: serialize_roles_v1_RolesPageReply,
    responseDeserialize: deserialize_roles_v1_RolesPageReply,
  },
  get_roles_by_id: {
    path: '/roles_v1.Roles/get_roles_by_id',
    requestStream: false,
    responseStream: false,
    requestType: roles_v1_pb.RoleIdRequest,
    responseType: roles_v1_pb.RolesReply,
    requestSerialize: serialize_roles_v1_RoleIdRequest,
    requestDeserialize: deserialize_roles_v1_RoleIdRequest,
    responseSerialize: serialize_roles_v1_RolesReply,
    responseDeserialize: deserialize_roles_v1_RolesReply,
  },
  set_roles: {
    path: '/roles_v1.Roles/set_roles',
    requestStream: false,
    responseStream: false,
    requestType: roles_v1_pb.RolesRequest,
    responseType: roles_v1_pb.RolesReply,
    requestSerialize: serialize_roles_v1_RolesRequest,
    requestDeserialize: deserialize_roles_v1_RolesRequest,
    responseSerialize: serialize_roles_v1_RolesReply,
    responseDeserialize: deserialize_roles_v1_RolesReply,
  },
  grant_roles: {
    path: '/roles_v1.Roles/grant_roles',
    requestStream: false,
    responseStream: false,
    requestType: roles_v1_pb.RolesRequest,
    responseType: roles_v1_pb.RolesReply,
    requestSerialize: serialize_roles_v1_RolesRequest,
    requestDeserialize: deserialize_roles_v1_RolesRequest,
    responseSerialize: serialize_roles_v1_RolesReply,
    responseDeserialize: deserialize_roles_v1_RolesReply,
  },
  revoke_roles: {
    path: '/roles_v1.Roles/revoke_roles',
    requestStream: false,
    responseStream: false,
    requestType: roles_v1_pb.RolesRequest,
    responseType: roles_v1_pb.RolesReply,
    requestSerialize: serialize_roles_v1_RolesRequest,
    requestDeserialize: deserialize_roles_v1_RolesRequest,
    responseSerialize: serialize_roles_v1_RolesReply,
    responseDeserialize: deserialize_roles_v1_RolesReply,
  },
  authorize: {
    path: '/roles_v1.Roles/authorize',
    requestStream: false,
    responseStream: false,
    requestType: roles_v1_pb.RolesRequest,
    responseType: roles_v1_pb.AuthorizeReply,
    requestSerialize: serialize_roles_v1_RolesRequest,
    requestDeserialize: deserialize_roles_v1_RolesRequest,
    responseSerialize: serialize_roles_v1_AuthorizeReply,
    responseDeserialize: deserialize_roles_v1_AuthorizeReply,
  },
};

exports.RolesClient = grpc.makeGenericClientConstructor(RolesService);
