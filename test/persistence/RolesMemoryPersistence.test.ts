// import { RolesMemoryPersistence } from '../../src/persistence/RolesMemoryPersistence';
// import { RolesPersistenceFixture } from './RolesPersistenceFixture';

// suite('RolesMemoryPersistence', ()=> {
//     let persistence: RolesMemoryPersistence;
//     let fixture: RolesPersistenceFixture;
    
//     setup((done) => {
//         persistence = new RolesMemoryPersistence();
//         fixture = new RolesPersistenceFixture(persistence);
        
//         persistence.open(null, done);
//     });
    
//     teardown((done) => {
//         persistence.close(null, done);
//     });
        
//     test('Get and Set Roles', (done) => {
//         fixture.testGetAndSetRoles(done);
//     });

// });