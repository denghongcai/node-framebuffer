#!/usr/bin/env node

'use strict';

var framebuffer = require('../lib/framebuffer');

var fb = new framebuffer('/dev/fb0');
console.log(fb.toString());

