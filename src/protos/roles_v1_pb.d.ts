// package: roles_v1
// file: roles_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class UserRoles extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUpdateTime(): string;
  setUpdateTime(value: string): void;

  clearRolesList(): void;
  getRolesList(): Array<string>;
  setRolesList(value: Array<string>): void;
  addRoles(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRoles.AsObject;
  static toObject(includeInstance: boolean, msg: UserRoles): UserRoles.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserRoles, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRoles;
  static deserializeBinaryFromReader(message: UserRoles, reader: jspb.BinaryReader): UserRoles;
}

export namespace UserRoles {
  export type AsObject = {
    id: string,
    updateTime: string,
    rolesList: Array<string>,
  }
}

export class UserRolesPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<UserRoles>;
  setDataList(value: Array<UserRoles>): void;
  addData(value?: UserRoles, index?: number): UserRoles;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRolesPage.AsObject;
  static toObject(includeInstance: boolean, msg: UserRolesPage): UserRolesPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserRolesPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRolesPage;
  static deserializeBinaryFromReader(message: UserRolesPage, reader: jspb.BinaryReader): UserRolesPage;
}

export namespace UserRolesPage {
  export type AsObject = {
    total: number,
    dataList: Array<UserRoles.AsObject>,
  }
}

export class RolesPageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RolesPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RolesPageRequest): RolesPageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RolesPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RolesPageRequest;
  static deserializeBinaryFromReader(message: RolesPageRequest, reader: jspb.BinaryReader): RolesPageRequest;
}

export namespace RolesPageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class RolesPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): UserRolesPage | undefined;
  setPage(value?: UserRolesPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RolesPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: RolesPageReply): RolesPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RolesPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RolesPageReply;
  static deserializeBinaryFromReader(message: RolesPageReply, reader: jspb.BinaryReader): RolesPageReply;
}

export namespace RolesPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: UserRolesPage.AsObject,
  }
}

export class RoleIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoleIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RoleIdRequest): RoleIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoleIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoleIdRequest;
  static deserializeBinaryFromReader(message: RoleIdRequest, reader: jspb.BinaryReader): RoleIdRequest;
}

export namespace RoleIdRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
  }
}

export class RolesRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  clearRolesList(): void;
  getRolesList(): Array<string>;
  setRolesList(value: Array<string>): void;
  addRoles(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RolesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RolesRequest): RolesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RolesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RolesRequest;
  static deserializeBinaryFromReader(message: RolesRequest, reader: jspb.BinaryReader): RolesRequest;
}

export namespace RolesRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
    rolesList: Array<string>,
  }
}

export class RolesReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  clearRolesList(): void;
  getRolesList(): Array<string>;
  setRolesList(value: Array<string>): void;
  addRoles(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RolesReply.AsObject;
  static toObject(includeInstance: boolean, msg: RolesReply): RolesReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RolesReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RolesReply;
  static deserializeBinaryFromReader(message: RolesReply, reader: jspb.BinaryReader): RolesReply;
}

export namespace RolesReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    rolesList: Array<string>,
  }
}

export class AuthorizeReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  getAuthorized(): boolean;
  setAuthorized(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizeReply.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizeReply): AuthorizeReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizeReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizeReply;
  static deserializeBinaryFromReader(message: AuthorizeReply, reader: jspb.BinaryReader): AuthorizeReply;
}

export namespace AuthorizeReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    authorized: boolean,
  }
}

