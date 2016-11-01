var blankXcord= "294px" ;// Location of the blank piece 
var blankYcord= "294px";
var base;


$(document).ready(function(){
	
	
	
	setTiles();
	$("#shufflebutton").on("click",shuffle())
	setMovable();
	moveTiles();
	
	
});


function setTiles(){
	var i = 0;
		var j = 0;
		var x = 0;
		var y = 0;
		$("#puzzlearea>div").each(function(){
			$(this).addClass("puzzlepiece"); // Give each puzzle piece the attributes of puzzle piece
			base = $("#puzzlearea>div:first-child").position();
			x = base.left+(98*i);
			y = base.top+(98*j);
			$(this).css({ // Set location of the pieces
				"top": y,
				"left": x			
				
			});
			
			if(i<3){
				i++;
			}else{
				i=0;	
				j++;
			}
			$(this).css({   // Set background for each puzzle piece 
				"background-position-x":0-x,
				"background-position-y":+0-y
			});
			
		
		
		
	});
}


//Function to check if a tile neighbours the empty space
function isNeighbor(x,y){ 
	
	
	if ( Math.abs(parseInt(blankXcord) - parseInt(x)) == 98){
       if (Math.abs(parseInt(blankYcord)- parseInt(y)) == 0){		
	      console.log("True");
		  return true;
		  
	   }
	}else if( Math.abs(parseInt(blankYcord) - parseInt(y)) == 98){
       if (Math.abs(parseInt(blankXcord)- parseInt(x)) == 0){		
	       console.log("True"); 
		   return true;
	   }
	}	
	console.log("False");
	return false;

}

//Set the tiles as movable piece or static
function setMovable(){	
    
	$(".puzzlepiece").each(function(){
     
	 if( isNeighbor( $(this).css("left"), $(this).css("top")))		
    	 $(this).addClass("movablepiece");
	 
	 else
		 $(this).removeClass("movablepiece");
	});
	
		
}


// Move tile to empty space if is movable
function moveTiles(){
	
	var tempX;
	var tempY;	
	
	$(".puzzlepiece").each(function(){
	
	$(this).off("click");	
	
	$(this).on("click", function(){	
	if ( isNeighbor( $(this).css("left"), $(this).css("top")) ){	
		tempX=$(this).css("left");
		
		tempY=$(this).css("top");
		
		$(this).animate({
		   "top":blankYcord,
		   "left":blankXcord			
		   });
		   
		blankXcord=tempX;
		blankYcord=tempY;	
    	
		setMovable();
	    $(this).addClass("movablepiece");
	}	
	
	console.log(blankXcord,blankYcord)
	 });   
   
  });
  
}


function shuffle(){
	
	$("#puzzlepiece").each(function(){
		/*$(this).css({ 
		  "top": ,
		  "left": 						
	  });*/
	});
}