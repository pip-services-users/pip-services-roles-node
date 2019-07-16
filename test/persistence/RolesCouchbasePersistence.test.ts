let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { RolesCouchbasePersistence } from '../../src/persistence/RolesCouchbasePersistence';
import { RolesPersistenceFixture } from './RolesPersistenceFixture';

suite('RolesCouchbasePersistence', ()=> {
    let persistence: RolesCouchbasePersistence;
    let fixture: RolesPersistenceFixture;

    setup((done) => {
        let couchbaseUri = process.env['COUCHBASE_SERVICE_URI'];
        let couchbaseHost = process.env['COUCHBASE_SERVICE_HOST'] || 'localhost';
        let couchbasePort = process.env['COUCHBASE_SERVICE_PORT'] || 8091;
        let couchbaseUser = process.env['COUCHBASE_USER'] || 'Administrator';
        let couchbasePass = process.env['COUCHBASE_PASS'] || 'password';
        if (couchbaseUri == null && couchbaseHost == null)
            return;
    
        var dbConfig = ConfigParams.fromTuples(
            'options.auto_create', true,
            'connection.uri', couchbaseUri,
            'connection.host', couchbaseHost,
            'connection.port', couchbasePort,
            'connection.detailed_errcodes', 1,
            'credential.username', couchbaseUser,
            'credential.password', couchbasePass
        );

        persistence = new RolesCouchbasePersistence();
        persistence.configure(dbConfig);

        fixture = new RolesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            if (err) {
                done(err);
                return;
            }
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