import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RolesCouchbasePersistence } from '../persistence/RolesCouchbasePersistence';
import { RolesMongoDbPersistence } from '../persistence/RolesMongoDbPersistence';
import { RolesFilePersistence } from '../persistence/RolesFilePersistence';
import { RolesMemoryPersistence } from '../persistence/RolesMemoryPersistence';
import { RolesController } from '../logic/RolesController';
import { RolesHttpServiceV1 } from '../services/version1/RolesHttpServiceV1';
import { RolesCommandableGrpcServiceV1 } from '../services/version1/RolesCommandableGrpcServiceV1';
import { RolesGrpcServiceV1 } from '../services/version1/RolesGrpcServiceV1';

export class RolesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-roles", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "mongodb", "*", "1.0");
	public static CouchbasePersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "couchbase", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-roles", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-roles", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-roles", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-roles", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RolesServiceFactory.MemoryPersistenceDescriptor, RolesMemoryPersistence);
		this.registerAsType(RolesServiceFactory.FilePersistenceDescriptor, RolesFilePersistence);
		this.registerAsType(RolesServiceFactory.MongoDbPersistenceDescriptor, RolesMongoDbPersistence);
		this.registerAsType(RolesServiceFactory.CouchbasePersistenceDescriptor, RolesCouchbasePersistence);
		this.registerAsType(RolesServiceFactory.ControllerDescriptor, RolesController);
		this.registerAsType(RolesServiceFactory.HttpServiceDescriptor, RolesHttpServiceV1);
		this.registerAsType(RolesServiceFactory.CommandableGrpcServiceDescriptor, RolesCommandableGrpcServiceV1);
		this.registerAsType(RolesServiceFactory.GrpcServiceDescriptor, RolesGrpcServiceV1);
	}
	
}
