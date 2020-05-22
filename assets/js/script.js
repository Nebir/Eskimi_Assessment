/* global variables */
var droppables = $(".icon"),
dropArea = $("#map"),
overlapThreshold = "80%",
item = 4;

/* 
	Drag development images into the map 
	When at least 80% of the image is on map and drag end, then image will disappear. 
	Otherwise image will go back to the initial place.
*/
Draggable.create(droppables, {
  	onDrag: function(e) {
	    if (this.hitTest(dropArea, overlapThreshold)) {
	      	$(this.target).addClass("highlight");
	    } else {
	      	$(this.target).removeClass("highlight");
	    }
  	},
	onDragEnd: function(e) {
		if (!$(this.target).hasClass("highlight")) {
			TweenLite.to(this.target, 0.2, {
		      	x: 0,
		      	y: 0
		    });
		}
		else {
			TweenLite.to(this.target, 0.2, {
		      	opacity:0, 
	      		scale:0
		    });
		    item--; //track how many items are dragged
		    if(item === 0){ 
		    	GoEndFrame(); //if all items are dragged change animation
		    }
		}
	}
});

/*
	After items dragged in map changes happened here
	1. Hide upper text
	2. Animate map and change image source
	3. Decrease overlay opacity so that background-image of Bongo-bondhu can be shown
	4. Appear final texts one by one with some animation.
*/
var GoEndFrame = function() {
	$("#instructionText").hide(1000); // 1
	$("#developmentIcons").css('display', 'none');

	
	$("#map").animate({height:"249px"}, 1000, function(){ // 2
		$(".ad-overlay").addClass('overlay-bg');
		$("#map").attr("src", "assets/images/map_after.png").delay("fast").fadeIn();
		$(".ad-overlay").animate({ // 3
		    opacity: 0.8,
		}, 750, function() {
			$(".t1").animate({opacity:1, marginLeft: "0px"}, 350, function(){ // 4
				$(".t2").animate({opacity:1, marginLeft: "0px"}, 350, function() {
					$(".t3").animate({opacity:1}, 1200).fadeIn();
				})
			});
		});
	});
}