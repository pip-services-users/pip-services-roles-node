import { YamlConfigReader } from 'pip-services-commons-node';

import { RolesMongoDbPersistence } from '../../src/persistence/RolesMongoDbPersistence';
import { RolesPersistenceFixture } from './RolesPersistenceFixture';

suite('RolesMongoDbPersistence', ()=> {
    let persistence: RolesMongoDbPersistence;
    let fixture: RolesPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new RolesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new RolesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Get and Set Roles', (done) => {
        fixture.testGetAndSetRoles(done);
    });
});