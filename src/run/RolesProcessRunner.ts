import { ProcessRunner } from 'pip-services-runtime-node';
import { RolesMicroservice } from './RolesMicroservice';

/**
 * Roles process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-25
 */
export class RolesProcessRunner extends ProcessRunner {
    /**
     * Creates instance of roles process runner
     */
    constructor() {
        super(new RolesMicroservice());
    }
}