import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { RolesMemoryPersistence } from '../../src/persistence/RolesMemoryPersistence';
import { RolesPersistenceFixture } from './RolesPersistenceFixture';

suite('RolesMemoryPersistence', ()=> {
    let db, fixture;
    
    suiteSetup((done) => {
        db = new RolesMemoryPersistence();
        db.configure(new ComponentConfig());

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