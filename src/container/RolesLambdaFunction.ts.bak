import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { RolesMicroservice } from '../run/RolesMicroservice';
import { IRolesBusinessLogic } from '../logic/IRolesBusinessLogic';

export class RolesLambdaFunction extends LambdaFunction {
    private _logic: IRolesBusinessLogic;

    constructor() {
        super(new RolesMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IRolesBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-roles", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}