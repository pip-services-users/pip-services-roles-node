import { Microservice } from 'pip-services-runtime-node';

import { RolesFactory } from '../build/RolesFactory';

/**
 * Roles microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-25
 */
export class RolesMicroservice extends Microservice {
	/**
	 * Creates instance of roles microservice.
	 */
	constructor() {
		super("pip-services-roles", RolesFactory.Instance);
	}
}
