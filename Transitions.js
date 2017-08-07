var AdaptTransitions;
/**
 * @author Jon
 */

function Transitions(){
	this.__transitionSpeed = 1;
	this.__transitionDelay = 0;
	this.__transitionDirection = null;
	this.__depth = 0;	
}

Object.defineProperty( Transitions.prototype, "transitionSpeed",{
	get: function() { return this.__transitionSpeed; },
  	set: function(newValue) { this.__transitionSpeed = newValue; }
});

Object.defineProperty( Transitions.prototype, "transitionDelay",{
	get: function() { return this.__transitionDelay; },
  	set: function(newValue) { this.__transitionDelay = newValue; }
});

Object.defineProperty( Transitions.prototype, "transitionDirection",{
	get: function() { return this.__transitionDirection; },
  	set: function(newValue) { this.__transitionDirection = newValue; }
});

Object.defineProperty( Transitions.prototype, "depth",{
	get: function() { return this.__depth; },
  	set: function(newValue) { this.__depth = newValue; }
});
		
Transitions.prototype.FadeTransition = function(from, to, direction, callback){
	to.__display.style.zIndex = this.__depth;//to.__display.css("z-index", this.__depth);
	this.__depth++;
					
	to.__display.style.opacity = 0;//to.__display.css("opacity",0);
	from.__display.style.opactiy = 1;//from.__display.css("opacity",1);
					
	TweenMax.to(to.__display, this.__transitionSpeed, {css:{opacity:1}, onComplete:function(){
		callback.onTransitionComplete();
		from.__display.style.display = 'none';//from.display.css("display", "none");
	}});
	to.__display.style.display = 'block';//to.display.css("display","block");
	to.__display.style.visibility = "visible";
};
		
Transitions.prototype.HorizontalSlide = function(from,to, backwards, callback){
	backwards = true;
	if( this.transitionDirection != null ){
		backwards = this.transitionDirection;
	}
	var pos = backwards ? callback.width : "-" + (callback.width);
	var str = backwards ? "-" + (callback.width) : callback.width;
	to.__display.style.left = (pos) + 'px';//to.__display.css("left",pos);
	from.__display.style.left = '0px';//from.__display.css("left",0);
	to.display.style.visibility = 'visible';
	//to.display.css("display","block");
	//trace( to.__display );
	//return;	
	//trace( this );
	//trace( this.__transitionSpeed );		
	TweenLite.to( from.__display, this.__transitionSpeed, {left:str});
	TweenLite.to( to.__display, this.__transitionSpeed, {left:0, onComplete:function(){
		callback.onTransitionComplete();
		//from.display.css("display", "none");
		from.display.style.display = 'none';
	}});
	//to.display.css("display","block");
	to.display.style.display = 'block';
};
		
Transitions.prototype.VerticalSlide = function(from,to, backwards, callback){
	var pos = backwards ? callback.height : "-" + (callback.height);
	to.display.style.display = 'block';
	to.__display.style.top = (pos) + 'px';//to.__display.css("top",pos);
	from.__display.style.top = '0px';//from.__display.css("top",0);
	var str = backwards ? "-" + (callback.height) : callback.height;
	//alert( str );
	
	trace( pos );
	trace( str );
					
	TweenLite.to( from.__display, this.__transitionSpeed, {top:str});
	TweenLite.to( to.__display, this.__transitionSpeed, {top:0, onComplete:function(){
		callback.onTransitionComplete();
		from.display.style.display = 'none';
	}});
	
};

Transitions.prototype.Horizontal3D = function(from,to, backwards, callback){
	if( this.transitionDirection != null ){
		backwards = this.transitionDirection;
	}
	
	var startRot = backwards ? 80 : -80;
	var startPos = backwards ? callback.width : "-" + (callback.width) + "px";
	var startOrigin = backwards ? "left 50%" : "right 50%";
	
	var endRot = backwards ? -80 : 80;
	var endPos = backwards ? "-" + (callback.width) + "px" : callback.width;
	var endOrigin = backwards ? "right 50%" : "left 50%";
	
	to.__display.style.zIndex = this.__depth;
	to.display.style.left = '0px';
	to.display.style.top = '0px';
	//to.__display.css("z-index", this.__depth);
	this.__depth++;
	to.display.style.display = 'block';
	to.display.style.visibility = "visible";
	TweenMax.to( to.__display, 0, {css: {rotationY: startRot, x:startPos}});
	TweenMax.to( from.__display, 0, {css: {rotationY: 0, x:0}});
	
	//console.log("check for shadow");
	var shadow = to.display.getElementsByClassName("shadow")[0];
	if( shadow != null){
		//console.log("Animate the shadow");
		shadow.removeAttribute("style");
		TweenMax.from( shadow, .6, {autoAlpha:.3});
		
		var fromshadow = from.display.getElementsByClassName("shadow")[0];
		TweenMax.to( fromshadow, .6, {autoAlpha:.3});
	}
					
	TweenMax.to( from.__display, this.__transitionSpeed, {css: {rotationY: endRot, transformOrigin:endOrigin, x:endPos}, delay:this.__transitionDelay});
	TweenMax.to( to.__display, this.__transitionSpeed, {css: {rotationY: 0, x:0, transformOrigin:startOrigin}, onComplete:function(){
		callback.onTransitionComplete();
		//from.display.css("display", "none");
		from.display.style.display = 'none';
		from.display.style.transform = null;
		to.display.style.transform = null;
	}, delay:this.__transitionDelay});
	//to.display.css("display","block");
	
};

Transitions.prototype.Vertical3D = function(from,to, backwards, callback){
	if( this.transitionDirection != null ){
		backwards = this.transitionDirection;
	}
	
	backwards = !backwards;
	var startRot = backwards ? -90 : 90;
	var startPos = backwards ? callback.height : "-" + (callback.height) + "px";
	var startOrigin = backwards ? "50% top" : "50% bottom";
	
	var endRot = backwards ? 90 : -90;
	var endPos = backwards ? "-" + (callback.height) + "px" : callback.height;
	var endOrigin = backwards ? "50% bottom" : "50% top";
	
	to.display.style.display = 'block';
	to.display.style.visibility = "visible";
	
	to.display.style.left = '0px';
	to.display.style.top = '0px';
	
	TweenMax.to( to.__display, 0, {css: {rotationX: startRot, y:startPos}});
	TweenMax.to( from.__display, 0, {css: {rotationX: 0, y:0}});
	
	//console.log("check for shadow");
	var shadow = to.display.getElementsByClassName("shadow")[0];
	if( shadow != null){
		//console.log("Animate the shadow");
		shadow.removeAttribute("style");
		TweenMax.from( shadow, .6, {autoAlpha:.3});
		
		var fromshadow = from.display.getElementsByClassName("shadow")[0];
		TweenMax.to( fromshadow, .6, {autoAlpha:.3});
	}
					
	TweenMax.to( from.__display, this.__transitionSpeed, {css: {rotationX: endRot, transformOrigin:endOrigin, y:endPos}});
	TweenMax.to( to.__display, this.transitionSpeed, {css: {rotationX: 0, y:0, transformOrigin:startOrigin}, onComplete:function(){
		callback.onTransitionComplete();
		//from.display.css("display", "none");
		from.display.style.display = 'none';
		to.display.style.transform = null;
		//to.display.style.transformOrigin = null;
		
		//from.display.style.transform = null;
		//from.display.style.transformOrigin = null;
		
		from.display.style.transform = null;
		to.display.style.transform = null;
	}});
					
	//to.__display.css("z-index", this.__depth);
	to.__display.style.zIndex = this.__depth;
	this.__depth++;
	//to.display.css("display","block");
	
};
		
AdaptTransitions = new Transitions();
