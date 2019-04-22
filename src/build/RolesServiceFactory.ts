import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RolesMongoDbPersistence } from '../persistence/RolesMongoDbPersistence';
import { RolesFilePersistence } from '../persistence/RolesFilePersistence';
import { RolesMemoryPersistence } from '../persistence/RolesMemoryPersistence';
import { RolesController } from '../logic/RolesController';
import { RolesHttpServiceV1 } from '../services/version1/RolesHttpServiceV1';

export class RolesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-roles", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-roles", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-roles", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-roles", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RolesServiceFactory.MemoryPersistenceDescriptor, RolesMemoryPersistence);
		this.registerAsType(RolesServiceFactory.FilePersistenceDescriptor, RolesFilePersistence);
		this.registerAsType(RolesServiceFactory.MongoDbPersistenceDescriptor, RolesMongoDbPersistence);
		this.registerAsType(RolesServiceFactory.ControllerDescriptor, RolesController);
		this.registerAsType(RolesServiceFactory.HttpServiceDescriptor, RolesHttpServiceV1);
	}
	
}
