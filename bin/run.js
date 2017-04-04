let RolesProcess = require('../obj/src/container/RolesProcess').RolesProcess;

try {
    new RolesProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
