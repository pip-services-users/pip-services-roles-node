let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { IRolesBusinessLogic } from '../../logic/IRolesBusinessLogic';

export class RolesSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the RolesSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-roles", "seneca", "1.0"
	);

    private _logic: IRolesBusinessLogic;

    constructor() {
        super(RolesSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IRolesBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-roles", "*", "*")
		);

		super.link(components);		

        this.registerCommands('roles', this._logic.getCommands());
	}
}
