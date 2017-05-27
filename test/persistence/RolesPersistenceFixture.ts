let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';

import { IRolesPersistence } from '../../src/persistence/IRolesPersistence';
import { UserRolesV1 } from '../../src/data/version1/UserRolesV1';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];
    
export class RolesPersistenceFixture {
    private _persistence: IRolesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public testGetAndSetRoles(done) {
        async.series([
        // Set party roles
            (callback) => {
                this._persistence.set(
                    null,
                    new UserRolesV1('1', ROLES),
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles.roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                this._persistence.getOneById(
                    null,
                    '1',
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles.roles, 3);

                        callback();
                    }
                );
            },
        // Get by filter
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples('roles', ['Role 1', 'Role X']),
                    null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

}
