var BLANK_X = 300;
var BLANK_Y = 300;
var	tiles=[];

window.onload=function 
{
	
	tiles= document.querySelectorAll("#puzzlearea > div");
	createTiles();
	
	
   }
	

function createTiles(){		
		  
		var j=0,t=3;		
		
		for (var i = 0; i < tiles.length; i++) {
			for (var x = 0; x <= t; x++) {
				tiles[i].className+=" puzzlepiece"; // Assigning class attributes of puzzle piece
                tiles[i].style.top = 100 * j + "px"; // Setting the location of the tile by row and columns 
				tiles[i].style.left = 100 * x  + "px";
				tiles[i].style.backgroundPosition = -x * 100 + "px " + j * -100 + "px";//Set image background position
			    tiles[i].addEventListener("click" ,moveTile(tiles[i]));
                tiles[i].addEventListener("mouseover", hover(tiles[i]));
				i++;
			}
         j++;
         if (j > 2) {
		    t = 2;
		 }+
         i--;
       }
	}	
	
function hover(tile) {
  if (neighborTest(tile.style.left, tile.style.top)) {
    tile.className+=" movablepiece";
  } else if (tile.className=="movablepiece") {
    tile.removeAttribute("movablepiece");
  }
}


function moveTile(tile) {
	
  if (neighborTest(tile.style.left, tile.style.top)) {
    var tempX = tile.style.left;
    var tempY = tile.style.top;
    tile.style.left = BLANK_X + "px";
    tile.style.top = BLANK_Y + "px";
    BLANK_X = parseInt(tempX);
    BLANK_Y = parseInt(tempY);
  }
	
}


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

// Shuffles the tiles by simulating 200 puzzle moves randomly
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

