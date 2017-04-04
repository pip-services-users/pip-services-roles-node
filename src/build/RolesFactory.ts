import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { RolesMongoDbPersistence } from '../persistence/RolesMongoDbPersistence';
import { RolesFilePersistence } from '../persistence/RolesFilePersistence';
import { RolesMemoryPersistence } from '../persistence/RolesMemoryPersistence';
import { RolesController } from '../logic/RolesController';
import { RolesHttpServiceV1 } from '../services/version1/RolesHttpServiceV1';
import { RolesSenecaServiceV1 } from '../services/version1/RolesSenecaServiceV1'; 

export class RolesFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-roles", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-roles", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-roles", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-roles", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RolesFactory.MemoryPersistenceDescriptor, RolesMemoryPersistence);
		this.registerAsType(RolesFactory.FilePersistenceDescriptor, RolesFilePersistence);
		this.registerAsType(RolesFactory.MongoDbPersistenceDescriptor, RolesMongoDbPersistence);
		this.registerAsType(RolesFactory.ControllerDescriptor, RolesController);
		this.registerAsType(RolesFactory.SenecaServiceDescriptor, RolesSenecaServiceV1);
		this.registerAsType(RolesFactory.HttpServiceDescriptor, RolesHttpServiceV1);
	}
	
}
