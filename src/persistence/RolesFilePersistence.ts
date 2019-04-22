import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

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