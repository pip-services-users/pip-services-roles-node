import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { RolesFactory } from '../build/RolesFactory';

export class RolesProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve Roles components
        references.put(RolesFactory.Descriptor, new RolesFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("roles", args, "./config/config.yaml");
    }

}
