let async = require('async');
let assert = require('chai').assert;

import { IRolesPersistence } from '../../src/persistence/IRolesPersistence';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];
    
export class RolesPersistenceFixture {
    private _db: IRolesPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    testGetAndSetRoles(done) {
        async.series([
        // Set party roles
            (callback) => {
                this._db.setRoles(
                    null,
                    '1',
                    ROLES,
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                this._db.getRoles(
                    null,
                    '1',
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            }
        ], done);
    }

}
