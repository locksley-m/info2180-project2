var BLANK_X = 300;
var BLANK_Y = 300;
var tiles = [];

// initialize the page as soon as it's finished loading by creating the fifteen
// puzzlepiece squares and attaching 'shufflebutton' click handler
window.onload = function() {
  generatetiles();
  $("shufflebutton").observe("click", shuffle);
};

// attaches puzzlepiece class to each div in the puzzlearea
// and positions each div, while attaching a click and mouseover 
// handler to each div
function generatetiles() {
  tiles = $$('#puzzlearea div');
  var j = 0;
  var t = 3;
  for (var i = 0; i < tiles.length; i++) {
    for (var x = 0; x <= t; x++) {
      tiles[i].addClassName("puzzlepiece");
      tiles[i].style.top = 100 * j + "px";
      tiles[i].style.left = 100 * x  + "px";
      tiles[i].style.backgroundPosition = -x * 100 + "px " + j * -100 + "px";
      tiles[i].observe("click", moveTile);
      tiles[i].observe("mouseover", hover);
      i++;
    }
    j++;
    if (j > 2) {
      t = 2;
    }
    i--;
  }
} 

// Attaches a class movablepiece while cursor hovers over square 
// if it neighbors the blank square
function hover(event) {
  if (neighborTest(this.style.left, this.style.top)) {
    this.addClassName("movablepiece");
  } else if (this.hasClassName("movablepiece")) {
    this.removeClassName("movablepiece");
  }
}

// Helper method that switches the given tile's position with 
// the blank square's position
function moveTileHelp(tile) {
  if (neighborTest(tile.style.left, tile.style.top)) {
    var tempX = tile.style.left;
    var tempY = tile.style.top;
    tile.style.left = BLANK_X + "px";
    tile.style.top = BLANK_Y + "px";
    BLANK_X = parseInt(tempX);
    BLANK_Y = parseInt(tempY);
  }
}

// outsources the tile movement to a helper method
function moveTile(event) {
  moveTileHelp(this);
}

// shuffles the tiles by simulating 200 puzzle moves randomly
function shuffle() {
  var temp = [];
  for (var i = 0; i < 200; i++) {
    for (var j = 0; j < tiles.length; j++) {
      if (neighborTest(tiles[j].style.left, tiles[j].style.top)) {
        temp.push(tiles[j]);
      }
    }
    moveTileHelp(temp[Math.floor(Math.random() * temp.length)]);
    temp = [];
  }
}

// tests whether a given tile neighbors the blank square
function neighborTest(x, y) {
  if (Math.abs(BLANK_Y - parseInt(y)) == 100) {
    if (Math.abs(BLANK_X - parseInt(x)) == 0) {
      return true;
    }
  } else if (Math.abs(BLANK_X - parseInt(x)) == 100) {
    if (Math.abs(BLANK_Y - parseInt(y)) == 0) {
      return true;
    }
  }
  return false;
}