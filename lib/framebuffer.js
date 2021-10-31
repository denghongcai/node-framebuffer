'use strict';

var fs = require('fs');
var ioctl = require('ioctl-napi');
var mmap = require('mmap-io');
var constants = require('./constants');
var structs = require('./structs');


var framebuffer = function(dev) {
  this.dev = dev;
  this.fbfd = fs.openSync(dev, 'r+');

  var vinfo = new structs.Vinfo(); // vinfo struct
  var ret = ioctl(this.fbfd, constants.FBIOGET_VSCREENINFO, vinfo.ref());
  if(ret !== 0) {
    throw new Error('IOCTL ERROR');
  }
  this.xres = vinfo.xres;
  this.yres = vinfo.yres;
  this.xoffset = vinfo.xoffset;
  this.yoffset = vinfo.yoffset;
  this.bytes_per_pixel = vinfo.bits_per_pixel / 8;
  this.bits_per_pixel = vinfo.bits_per_pixel;
  this.grayscale = vinfo.grayscale;
  this.red = vinfo.red;
  this.green = vinfo.green;
  this.blue = vinfo.blue;
  this.transp = vinfo.transp;
  this.nonstd = vinfo.nonstd;

  var finfo = new structs.Finfo();
  ret = ioctl(this.fbfd, constants.FBIOGET_FSCREENINFO, finfo.ref());
  if(ret !== 0) {
    throw new Error('IOCTL ERROR');
  }
  this.name = finfo.id.buffer.toString('ascii');
  this.type = finfo.type;
  this.visual = finfo.visual;
  this.line_length = finfo.line_length;

  this.screensize = vinfo.xres * vinfo.yres * this.bytes_per_pixel;

  var rx_prot = mmap.PROT_READ | mmap.PROT_WRITE;
  var priv = mmap.MAP_SHARED;
  this.fbp = mmap.map(this.screensize, rx_prot, priv, this.fbfd);
};

framebuffer.prototype.close = function() {
  this.fbfd.close();
  this.fbp.close();
};

framebuffer.prototype.blank = function(blank) {
  var ret;
  if(blank) {
    ret = ioctl(this.fbfd, constants.FBIOBLANK, constants.FB_BLANK_POWERDOWN);
    if(ret !== 0) {
      throw new Error('IOCTL ERROR');
    }
  }
  else {
    ret = ioctl(this.fbfd, constants.FBIOBLANK, constants.FB_BLANK_UNBLANK);
    if(ret !== 0) {
      throw new Error('IOCTL ERROR');
    }
  }
};

framebuffer.prototype.toString = function() {
  return 'Framebuffer device information:\n' +
      ' Device: ' + this.dev + '\n' +
      ' Name: ' + this.name + '\n' +
      ' Size: ' + this.screensize + '\n' +
      ' Type: ' + this.type + '\n';
};

module.exports = framebuffer;

