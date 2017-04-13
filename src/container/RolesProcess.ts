import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { RolesFactory } from '../build/RolesFactory';

export class RolesProcess extends ProcessContainer {

    public constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesFactory);
    }

}
