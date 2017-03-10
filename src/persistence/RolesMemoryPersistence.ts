let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { RolesFilePersistence } from './RolesFilePersistence';
import { IRolesPersistence } from './IRolesPersistence';

export class RolesMemoryPersistence extends RolesFilePersistence implements IRolesPersistence {
	/**
	 * Unique descriptor for the RolesFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-roles", "memory", "*"
	);

    constructor() {
        super(RolesMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}
