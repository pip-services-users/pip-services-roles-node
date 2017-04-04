import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { RolesMemoryPersistence } from './RolesMemoryPersistence';
import { UserRolesV1 } from '../data/version1/UserRolesV1';

export class RolesFilePersistence extends RolesMemoryPersistence {
	protected _persister: JsonFilePersister<UserRolesV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<UserRolesV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}