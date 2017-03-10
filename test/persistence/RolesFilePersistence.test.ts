import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { RolesFilePersistence } from '../../src/persistence/RolesFilePersistence';
import { RolesPersistenceFixture } from './RolesPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/roles.test.json',
        data: []
    }
});

suite('RolesFilePersistence', ()=> {
    let db, fixture;
    
    suiteSetup((done) => {
        db = new RolesFilePersistence();
        db.configure(config);

        fixture = new RolesPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done); 
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });

    setup((done) => {
        db.clearTestData(done);
    });
        
    test('Get and Set Roles', (done) => {
        fixture.testGetAndSetRoles(done);
    });

});