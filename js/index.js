var image = null;
var greyi = null;
var redi = null;
var rainbowi = null;
var blurredi = null;
var canvas = document.getElementById("canvas");

function upload() {
  var fileinput = document.getElementById("finput");
  image = new SimpleImage(fileinput);
  greyi = new SimpleImage(fileinput);
  redi = new SimpleImage(fileinput);
  rainbowi = new SimpleImage(fileinput);
  blurredi = new SimpleImage(fileinput);
  image.drawTo(canvas);
}

function filtergray() {
  for (var pixel of greyi.values()) {
    var nRGB = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(nRGB);
    pixel.setGreen(nRGB);
    pixel.setBlue(nRGB);
  }
}

function filterred() {
  for (var pixel of redi.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}

function filterrainbow() {
  for (var pixel of rainbowi.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var y = pixel.getY();
    var h = rainbowi.getHeight();
    if (y < h * 1 / 7) {
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else if (avg >= 128) {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    }
    if (y >= h * 1 / 7 && y <= h * 2 / 7) {
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
      } else if (avg >= 128) {
        pixel.setRed(255);
        pixel.setGreen(1.2 * avg - 51);
        pixel.setBlue(2 * avg - 255);
      }
    }
    if (y >= h * 2 / 7 && y <= h * 3 / 7) {
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else if (avg >= 128) {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    }
    if (y >= h * 3 / 7 && y < h * 4 / 7) {
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else if (avg >= 128) {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    }
    if (y >= h * 4 / 7 && y <= h * 5 / 7) {
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else if (avg >= 128) {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    }
    if (y >= h * 5 / 7 && y <= h * 6 / 7) {
      if (avg < 128) {
        pixel.setRed(0.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else if (avg >= 128) {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    }
    if (y > h * 6 / 7) {
      if (avg < 128) {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      } else if (avg >= 128) {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    }
  }
}

function reset() {
  if (imageloaded(image)) {
    greyi = new SimpleImage(image);
    redi = new SimpleImage(image);
    rainbowi = new SimpleImage(image);
    blurredi = new SimpleImage(image);
    image.drawTo(canvas);
  }
}

function ensureimage(coordinate, size) {
  if (coordinate < 0) {
    return 0;
  }
  if (coordinate >= size) {
    return size - 1;
  }
  return coordinate;
}

function getpixelnearby(image, x, y, diameter) {
  var dx = Math.random() * diameter - diameter / 2;
  var dy = Math.random() * diameter - diameter / 2;
  var nx = ensureimage(x + dx, image.getWidth());
  var ny = ensureimage(y + dy, image.getHeight());
  return image.getPixel(nx, ny);
}

function filterblur() {
  var output = new SimpleImage(
    blurredi.getWidth(),
    blurredi.getHeight()
  );
  for (var pixel of blurredi.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
      var other = getpixelnearby(image, x, y, 10);
      blurredi.setPixel(x, y, other);
    } else {
      blurredi.setPixel(x, y, pixel);
    }
  }
}

function imageloaded(image) {
  if (image == null || !image.complete()) {
    alert("Image is not loaded");
    return false;
  } else {
    return true;
  }
}

function dogrey() {
  if (imageloaded(greyi)) {
    filtergray();
    greyi.drawTo(canvas);
  }
}
function dored() {
  if (imageloaded(redi)) {
    filterred();
    redi.drawTo(canvas);
  }
}
function dorain() {
  if (imageloaded(rainbowi)) {
    filterrainbow();
    rainbowi.drawTo(canvas);
  }
}
function doblur() {
  if (imageloaded(blurredi)) {
    filterblur();
    blurredi.drawTo(canvas);
  }
}
