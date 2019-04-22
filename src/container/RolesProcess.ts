import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { RolesServiceFactory } from '../build/RolesServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class RolesProcess extends ProcessContainer {

    public constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
