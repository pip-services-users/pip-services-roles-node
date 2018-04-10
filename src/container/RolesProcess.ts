import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { RolesServiceFactory } from '../build/RolesServiceFactory';

export class RolesProcess extends ProcessContainer {

    public constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
