/**
 * @author Jon
 */
var unitExpanded = false;

function getElement( id ){
	return document.getElementById( id );
	
};

function CascadeTransition( display, callback ){

	var startRot = -90;
	var startPos = 0;
	var startOrigin = "50% top";
	
	TweenMax.to( display, 0, {css: {rotationX: startRot}});
	display.style.display = "block";
	display.style.visibility = "visible";
	
	var shadow = display.getElementsByClassName("shadow")[0];
	if( shadow != null){
		shadow.removeAttribute("style");
		TweenMax.from( shadow, .6, {autoAlpha:0.3});
	}
	
	TweenMax.to( display, .6, {css: {rotationX: 0, x:0, transformOrigin:startOrigin}, onComplete:function(){
		display.style.transform = 'none';
		if( callback != null){
			callback();
		}
		
	}, delay:0});		
}

function CloseCascade( display, callback ){

	var startRot = 0;
	var startPos = 0;
	var startOrigin = "50% top";
	
	TweenMax.to( display, 0, {css: {rotationX: startRot}});
	display.style.display = "block";
	
	var shadow = display.getElementsByClassName("shadow")[0];
	if( shadow != null){
		shadow.removeAttribute("style");
		TweenMax.to( shadow, .6, {autoAlpha:0.3});
	}
	
	TweenMax.to( display, .6, {css: {rotationX: -90, transformOrigin:startOrigin}, onComplete:function(){
		display.style.display = "none";
		if( callback != null){
			callback();
		}
		
	}, delay:0});		
}

function setupRolloverElement( element ){
	element.addEventListener("click", onRolloverTimerReached, false);
	
	element.onmouseover = function(){
		//console.log( "on mouse over" );
		onStartRolloverTimer();
	};
	
	element.onmouseout = function(){
		//console.log( "on mouse out" );
		onEndRolloverTimer();
	};
};

function onStartRolloverTimer(){
	if( unitExpanded ){
		return;
	}
	TweenMax.delayedCall(1, onRolloverTimerReached);
	onPreExpandStarted();
}

function onEndRolloverTimer(){
	TweenMax.killDelayedCallsTo(onRolloverTimerReached);
	onPreExpandEnded();
}

function onRolloverTimerReached(){
	onEndRolloverTimer();
	onExpandUnit();
}

/* override these functions in format js file */
function onPreExpandStarted(){};
function onPreExpandEnded(){};
function onExpandUnit(){};


