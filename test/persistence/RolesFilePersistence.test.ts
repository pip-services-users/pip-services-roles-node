import { ConfigParams } from 'pip-services3-commons-node';

import { RolesFilePersistence } from '../../src/persistence/RolesFilePersistence';
import { RolesPersistenceFixture } from './RolesPersistenceFixture';

suite('RolesFilePersistence', ()=> {
    let persistence: RolesFilePersistence;
    let fixture: RolesPersistenceFixture;
    
    setup((done) => {
        persistence = new RolesFilePersistence('./data/roles.test.json');

        fixture = new RolesPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Get and Set Roles', (done) => {
        fixture.testGetAndSetRoles(done);
    });
});