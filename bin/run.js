let RolesProcess = require('../obj/src/container/RolesProcess').RolesProcess;

try {
    new RolesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
