import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { RolesMongoDbPersistence } from '../persistence/RolesMongoDbPersistence';
import { RolesFilePersistence } from '../persistence/RolesFilePersistence';
import { RolesMemoryPersistence } from '../persistence/RolesMemoryPersistence';
import { RolesController } from '../logic/RolesController';
import { RolesRestService } from '../services/version1/RolesRestService';
import { RolesSenecaService } from '../services/version1/RolesSenecaService'; 

export class RolesFactory extends ComponentFactory {
	public static Instance: RolesFactory = new RolesFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(RolesFilePersistence.Descriptor, RolesFilePersistence);
		this.register(RolesMemoryPersistence.Descriptor, RolesMemoryPersistence);
		this.register(RolesMongoDbPersistence.Descriptor, RolesMongoDbPersistence);
		this.register(RolesController.Descriptor, RolesController);
		this.register(RolesRestService.Descriptor, RolesRestService);
		this.register(RolesSenecaService.Descriptor, RolesSenecaService);
	}
	
}
