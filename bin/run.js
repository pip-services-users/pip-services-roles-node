/**
 * @file User roles process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var RolesProcessRunner = require('../lib/src/run/RolesProcessRunner').RolesProcessRunner;

var runner = new RolesProcessRunner();
runner.startWithDefaultConfig('../config/config.json');