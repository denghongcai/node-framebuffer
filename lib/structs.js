var ref = require('ref');
var StructType = require('ref-struct');
var ArrayType = require('ref-array');

// definitions from linux/fb.h
exports.Vinfo = StructType({
  xres: ref.types.uint32,
  yres: ref.types.uint32,
  xres_virtual: ref.types.uint32,
  yres_virtual: ref.types.uint32,
  xoffset: ref.types.uint32,
  yoffset: ref.types.uint32,
  bits_per_pixel: ref.types.uint32,
  grayscale: ref.types.uint32,
  red: StructType({
    offset: ref.types.uint32,
    length: ref.types.uint32,
    msb_rigth: ref.types.uint32
  }),
  green: StructType({
    offset: ref.types.uint32,
    length: ref.types.uint32,
    msb_right: ref.types.uint32
  }),
  blue: StructType({
    offset: ref.types.uint32,
    length: ref.types.uint32,
    msb_right: ref.types.uint32
  }),
  transp: StructType({
    offset: ref.types.uint32,
    length: ref.types.uint32,
    msb_right: ref.types.uint32
  }),
  nonstd: ref.types.uint32,
  activate: ref.types.uint32,
  height: ref.types.uint32,
  width: ref.types.uint32,
  accel_flags: ref.types.uint32,
  pixclock: ref.types.uint32,
  left_margin: ref.types.uint32,
  right_margin: ref.types.uint32,
  upper_margin: ref.types.uint32,
  lower_margin: ref.types.uint32,
  hsync_len: ref.types.uint32,
  vsync_len: ref.types.uint32,
  sync: ref.types.uint32,
  vmode: ref.types.uint32,
  rotate: ref.types.uint32,
  colorspace: ref.types.uint32,
  reserved: ArrayType(ref.types.uint32, 4)
});

exports.Finfo = StructType({
  id: ArrayType(ref.types.char, 16),
  smem_start: ref.types.ulong,
  smem_len: ref.types.uint32,
  type: ref.types.uint32,
  type_aux: ref.types.uint32,
  visual: ref.types.uint32,
  xpanstep: ref.types.uint16,
  ypanstep: ref.types.uint16,
  ywrapstep: ref.types.uint16,
  line_length: ref.types.uint32,
  mmio_start: ref.types.ulong,
  mmio_len: ref.types.uint32,
  accel: ref.types.uint32,
  capabilities: ref.types.uint16,
  reserved: ArrayType(ref.types.uint16, 2)
});
