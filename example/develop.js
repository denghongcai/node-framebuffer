'use strict';

var frambuffer = require('../lib/framebuffer');

var fb = new frambuffer('/dev/fb0');
console.log(fb.toString());