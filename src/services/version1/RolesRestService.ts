let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';

import { IRolesBusinessLogic } from '../../logic/IRolesBusinessLogic';

export class RolesRestService extends RestService {       
	/**
	 * Unique descriptor for the RolesRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-roles", "rest", "1.0"
	);
    
	private _logic: IRolesBusinessLogic;

    constructor() {
        super(RolesRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IRolesBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-roles", "*", "*")
		);

		super.link(components);		
	}
    
    private getRoles(req, res) {
        this._logic.getRoles(
            req.params.correlation_id,
            req.params.userId,
            this.sendResult(req, res)
        );
    }

    private setRoles(req, res) {
        this._logic.setRoles(
            req.params.correlation_id,
            req.params.userId,
            req.body.roles,
            this.sendResult(req, res)
        );
    }

    private grantRoles(req, res) {
        if (req.params.roles) {
            let roles = req.params.roles;
            if (_.isString(roles)) 
                roles = roles.split(',');
            
            this._logic.grantRoles(
                req.params.correlation_id,
                req.params.userId,
                roles,
                this.sendResult(req, res)
            );
        } else {
            this._logic.grantRoles(
                req.params.correlation_id,
                req.params.userId,
                req.body.roles,
                this.sendResult(req, res)
            );
        }
    }

    private revokeRoles(req, res) {
        if (req.params.roles) {
            let roles = req.params.roles;
            if (_.isString(roles)) 
                roles = roles.split(',');
            
            this._logic.revokeRoles(
                req.params.correlation_id,
                req.params.userId,
                roles,
                this.sendResult(req, res)
            );
        } else {
            this._logic.revokeRoles(
                req.params.correlation_id,
                req.params.userId,
                req.body.roles,
                this.sendResult(req, res)
            );
        }
    }

    private authorize(req, res) {
        let roles = req.params.roles;
        if (_.isString(roles)) 
            roles = roles.split(',');
        
        this._logic.authorize(
            req.params.correlation_id,
            req.params.userId,
            roles,
            this.sendResult(req, res)
        );
    }
        
    protected register() {
        this.registerRoute('get', '/roles/:userId', this.getRoles);
        this.registerRoute('post', '/roles/:userId', this.setRoles);
        this.registerRoute('put', '/roles/:userId', this.grantRoles);
        this.registerRoute('delete', '/roles/:userId', this.revokeRoles);
        this.registerRoute('get', '/roles/:userId/authorize', this.authorize);
    }
}
