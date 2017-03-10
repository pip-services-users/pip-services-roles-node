/**
 * @file User roles seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var RolesSenecaPlugin = require('../lib/src/run/RolesSenecaPlugin').RolesSenecaPlugin;
var plugin = new RolesSenecaPlugin();

module.exports = plugin.entry();