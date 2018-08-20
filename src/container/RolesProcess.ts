import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { RolesServiceFactory } from '../build/RolesServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class RolesProcess extends ProcessContainer {

    public constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
