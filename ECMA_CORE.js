/**
 * @author Jon
 */
function createCustomEvent(event, params){
	 params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
}

function trace( value ){
	//console.log( value );
}

function onTimerReached(e){
	//console.log( e );
	e.onTimerReached.call(e);
}

function getElement( id ){
	return document.getElementById( id );
	
};

/*------------------------------------------------------------------------------------------
 * 
 * PRELOADER
 * 
 -------------------------------------------------------------------------------------------*/
function Preloader(){
	/*this.loadListeners = [];
	this.elementListeners = {};*/
	this.currentLoads = [];
	this.__preloadDisplay = null;
}

Object.defineProperty( Preloader.prototype, "preloadDisplay",{
	get: function() { return this.__preloadDisplay; },
  	set: function(newValue) { this.__preloadDisplay = newValue; }
});

Preloader.prototype.addLoadListener = function( object ){
		/*this.elementListeners[object.id] = [];
		this.loadListeners.push( object );*/
};
Preloader.prototype.removeLoadListener = function( object ){
	//this.elementListeners[object.id] = null;
};
Preloader.prototype.load = function( value, element ){
	if( value == "" || value == null){
		return;
	}
	var p = element.parent;
	if( p == null || p.id == null ){
		return;
	}
	if( this.currentLoads.indexOf(value) < 0 ){
		this.currentLoads.push( value );
	}
	trace( "start preload" );
	if( this.currentLoads.length > 0 && this.__preloadDisplay != null){
		trace( "display preloader" );
		//this.animatePreloader( this.__preloadDisplay );
		//this.__preloadDisplay.style.display = "block";
	}
	//trace( this.currentLoads );
	/*while( p != null ){
		var arr = this.elementListeners[p.id];
		if( arr != null ){
			if( arr.indexOf(value) < 0){
				arr.push( value );
			}
		}
		p = p.parent;
	}*/
};
Preloader.prototype.clearPreload = function( value, element ){
	var arr = this.currentLoads;
	var pIndex = arr.indexOf( value );
	if( pIndex > -1){
		arr.splice( pIndex, 1 );
		if( arr.length == 0 ){
			trace("end preload");
			this.dispatchEvent( "onPreloadComplete" );
			if( this.__preloadDisplay != null){
				trace("hide preloader");
				//TweenMax.killTweensOf( this.__preloadDisplay );
				//this.__preloadDisplay.style.display = "none";
			}
		}
	}
	var p = element.parent;
	/*while( p != null){
		var arr = this.elementListeners[p.id];
		if( arr != null ){
			var pIndex = arr.indexOf( value );
			if( pIndex > -1){
				arr.splice( pIndex, 1 );
				if( arr.length == 0 ){
					this.dispatchEvent( "onPreloadComplete", p );
				}
			}
		}
		p = p.parent;
	}*/
};
Preloader.prototype.addEventListener = function( event, func, capt ){
	this.eventDispatcher = document.body;
	this.eventDispatcher.addEventListener( event, func, capt );
};

Preloader.prototype.dispatchEvent = function( value, element ){
	this.eventDispatcher = document.body;
	this.eventDispatcher.dispatchEvent( createCustomEvent(value) );
};
Preloader.prototype.getNumberPreloads = function( element ){
	//trace( this.elementListeners[ element.id ] );
	return this.currentLoads.length;
	/*var arr = null;//this.elementListeners[ element.id ];
	return arr == null ? 0 : arr.length;*/
};

Preloader.prototype.animatePreloader = function ( disp ){
	var c = this;
	TweenMax.to( disp, .2, {ease:Linear.easeNone, css:{rotation:180}, onComplete:function(){
		TweenMax.to( disp, .2, {ease:Linear.easeNone, css:{rotation:360}, onComplete:function(){
			TweenMax.to( disp, 0, {css:{rotation:0}});
			c.animatePreloader( disp );
		}});
	}});
};

var AdaptLoader = new Preloader();

/*------------------------------------------------------------------------------------------
 * 
 * CAROUSEL ELEMENT
 * 
 -------------------------------------------------------------------------------------------*/

function CarouselElement( element ){
	this.__id = element;
	this.__parentCarousel = null;
	this.__parent = null;
	this.__display = document.getElementById(element);//$( id );
	if( this.__display == null){
		this.__display = document.createElement('div');//$("<div id='" + this.id + "' style='width:100%;height:100%' />");
		this.__display.setAttribute('id', element);
		this.__display.setAttribute('style', 'width:100%;height:100%');
	}
}

CarouselElement.prototype.onSelected = function(){};
CarouselElement.prototype.onDisplayed = function(){};
CarouselElement.prototype.onUnSelected = function(){};

CarouselElement.prototype.addChild = function( child ){
	this.__display.appendChild( child.__display );
	child.parent = this;
};
		
CarouselElement.prototype.addEventListener = function(type, func, bool){
	this.display.addEventListener(type, func, bool);
};
CarouselElement.prototype.removeEventListener = function(type, func, bool){
	this.display.removeEventListener(type, func, bool);
};
		

Object.defineProperty( CarouselElement.prototype, "id",{
	get: function() { return this.__id; },
  	set: function(newValue) { this.__id = newValue; }
});

Object.defineProperty( CarouselElement.prototype, "parentCarousel",{
	get: function() { return this.__parentCarousel; },
	set: function(newValue) { this.__parentCarousel = newValue; }
});

Object.defineProperty(CarouselElement.prototype, "parent", {
	get: function() { return this.__parent; },
	set: function(newValue) { this.__parent = newValue; }
});

Object.defineProperty(CarouselElement.prototype, "width", {
	get: function() { return parseInt(this.__display.style.width); },
	set: function(newValue) { this.__display.style.width = newValue; }
});

Object.defineProperty(CarouselElement.prototype, "height", {
	get: function() { return parseInt(this.__display.style.height); },
	set: function(newValue) { this.__display.style.height = newValue; }
});

Object.defineProperty(CarouselElement.prototype, "x", {
	get: function() { return parseInt(this.__display.style.left); },
	set: function(newValue) { this.__display.style.left = newValue; }
});

Object.defineProperty(CarouselElement.prototype, "y", {
	get: function() { return parseInt(this.__display.style.top); },
	set: function(newValue) { this.__display.style.top = newValue; }
});

Object.defineProperty(CarouselElement.prototype, "display", {
	get: function() { return this.__display; }
});


/*------------------------------------------------------------------------------------------
 * 
 * HTML ELEMENT
 * 
 -------------------------------------------------------------------------------------------*/
function HTMLElement( id, content ){
	CarouselElement.call(this, id);
	this.__selectedFunction = null;
	this.__displayedFunction = null;
	this.__unselectedFunction = null;
	
	if( content != "" ){
		this.display.innerHTML = content;
	}
}

HTMLElement.prototype = Object.create(CarouselElement.prototype);
HTMLElement.prototype.constructor = HTMLElement;

HTMLElement.prototype.onSelected = function(){
	CarouselElement.prototype.onSelected.call(this);
	if( this.__selectedFunction != null){
		this.__selectedFunction.call(this);
	}
};
HTMLElement.prototype.onDisplayed = function(){
	CarouselElement.prototype.onDisplayed.call(this);
	if( this.__displayedFunction != null){
		this.__displayedFunction.call(this);
	}
};
HTMLElement.prototype.onUnSelected = function(){
	CarouselElement.prototype.onUnSelected.call(this);
	if( this.__unselectedFunction != null){
		this.__unselectedFunction.call(this);
	}
};

Object.defineProperty(HTMLElement.prototype, "selectedFunction", {
	get: function() { return this.__selectedFunction; },
	set: function(newValue) { this.__selectedFunction = newValue; }
});

Object.defineProperty(HTMLElement.prototype, "displayedFunction", {
	get: function() { return this.__displayedFunction; },
	set: function(newValue) { this.__displayedFunction = newValue; }
});

Object.defineProperty(HTMLElement.prototype, "unselectedFunction", {
	get: function() { return this.__unselectedFunction; },
	set: function(newValue) { this.__unselectedFunction = newValue; }
});




/*------------------------------------------------------------------------------------------
 * 
 * CAROUSEL
 * 
 -------------------------------------------------------------------------------------------*/
function Carousel(id){
	CarouselElement.call(this,id);
	//trace( id );
	this.__index = -1;
	this.slides = [];
	this.__autoPlay = false;
	this.__transition = null;
	this.__delay = 3000;
	this.__preloadContent = false;
	this.__currentDisplay = null;
	this.__timer = null;
	this.__forwards = true;
	this.__transitioning = false;
	var c1 = this;
	AdaptLoader.addEventListener("onPreloadComplete", function(e){c1.onPreloadComplete(e);}, false );
}

Carousel.prototype = Object.create(CarouselElement.prototype);
Carousel.prototype.constructor = Carousel;

/**
 * Methods
 */
Carousel.prototype.onPreloadComplete = function( e ){
	this.onSelectSlide();
	if(this.__autoPlay){
		this.start();
	}
};

Carousel.prototype.setCurrentIndex = function( index ){
	if(this.__index == index){
		return;
	}
	this.__forwards = this.__index < index;
	this.__index = index;
	if( this.slides.length == 0){
		return;
	}
	
	if(this.preloadContent){
		AdaptLoader.addLoadListener( this );
	}
	
	this.getCurrentDisplay = this.slides[index];
	if( this.getCurrentDisplay != null ){
		this.__transitioning = true;
		var e = createCustomEvent("onSelected");
		this.display.dispatchEvent( e );
		if( this.getCurrentDisplay.parentCarousel == null ){
			this.getCurrentDisplay.parentCarousel = this;
			this.addChild( this.getCurrentDisplay );
		}
		
		this.getCurrentDisplay.onSelected();
		if( this.__currentDisplay != null ){
			//this.getCurrentDisplay.display.style.display = 'none';
			this.__currentDisplay.onUnSelected();
		}
		
		var preloads = AdaptLoader.getNumberPreloads( this );
		trace( preloads );
		
		if( (!this.preloadContent) || (preloads == 0)){
			this.onSelectSlide();	
		}else{
			this.pause();
		}
		
	}
	
};

Carousel.prototype.onSelectSlide = function(){
	if( !this.__transitioning ){
		return;
	}
	if( this.__currentDisplay != null ){
		if( this.transition != null ){
			this.transition.call(AdaptTransitions, this.__currentDisplay, this.getCurrentDisplay, this.__forwards, this);
		}else{
			this.onTransitionComplete();
		}		
	}
	if( this.__currentDisplay == null ){
		this.getCurrentDisplay.onDisplayed();
	}
	
	this.__transitioning = false;
	this.__currentDisplay = this.getCurrentDisplay;
	AdaptLoader.removeLoadListener( this );
};

Carousel.prototype.onTimerReached = function(){
	this.start();
	var pos = (this.getCurrentIndex()) + 1;
	if(pos >= this.slides.length){
		pos = 0;
		var e = createCustomEvent("onCarouselLooped");
		this.display.dispatchEvent( e );
	}
	this.setCurrentIndex( pos );
	
};

Carousel.prototype.onTransitionComplete = function(){
	this.__currentDisplay.onDisplayed();
	var e = createCustomEvent("onTransitionComplete");
	this.display.dispatchEvent( e );
};
Carousel.prototype.getCurrentIndex = function(){
	return this.__index;
};

Carousel.prototype.onSelected = function(){
	CarouselElement.prototype.onSelected.call(this);
	this.setCurrentIndex( 0 );
};
Carousel.prototype.onDisplayed = function(){
	CarouselElement.prototype.onDisplayed.call(this);
	if( this.autoPlay ){
		this.start();
	}
	if( this.getCurrentDisplay != null ){
		this.getCurrentDisplay.onDisplayed();
	}
	
};
Carousel.prototype.onUnSelected = function(){
	CarouselElement.prototype.onUnSelected.call(this);
	if( this.getCurrentDisplay != null ){
		this.getCurrentDisplay.onUnSelected();
	}
	this.pause();
};
Carousel.prototype.getCurrentDisplay = function(){
	return this.__currentDisplay;
};
Carousel.prototype.togglePlay = function( play ){
	clearTimeout( this.__timer );
	if( play == true ){
		this.__timer = setTimeout(this.onTimerReached.bind(this), this.__delay);
		return;
	}
};
Carousel.prototype.start = function(){
	this.togglePlay( true );
};

Carousel.prototype.pause = function(){
	this.togglePlay( false );
};
Carousel.prototype.reset = function(){
	this.setCurrentIndex( 0 );
};

Object.defineProperty( Carousel.prototype, "transition",{
	get: function() { return this.__transition; },
	set: function(newValue) { this.__transition = newValue; }
});

Object.defineProperty( Carousel.prototype, "autoPlay",{
	get: function() { return this.__autoPlay; },
	set: function(newValue) { this.__autoPlay = newValue; }
});

Object.defineProperty( Carousel.prototype, "delay",{
	get: function() { return this.__delay; },
	set: function(newValue) { this.__delay = newValue; }
});

Object.defineProperty( Carousel.prototype, "preloadContent",{
	get: function() { return this.__preloadContent; },
	set: function(newValue) { this.__preloadContent = newValue; }
});

Object.defineProperty( Carousel.prototype, "currentIndex",{
	get: function() { return this.__index; }
});


/*------------------------------------------------------------------------------------------
 * 
 * Dynamic Image
 * 
 -------------------------------------------------------------------------------------------*/
function DynamicImage( id, src ){
	CarouselElement.call( this, id );
	this.__source = "";
	this.__loaded = false;
	this.__imageHolder = null;
	var imgTag = document.createElement('img');
	this.__display.appendChild( imgTag );
	this.__imageHolder = imgTag;
	var t = this;
	this.__imageHolder.addEventListener("load", function(){
		AdaptLoader.clearPreload( t.source, t );
	});
	if( typeof src != 'undefined'){
		this.source = src;
	}
}

DynamicImage.prototype = Object.create(CarouselElement.prototype);
DynamicImage.prototype.constructor = DynamicImage;

Object.defineProperty( DynamicImage.prototype, "source",{
	get: function() { return this.__source; },
	set: function(newValue) { 
		this.__source = newValue;
		if(this.parent != null ){
			AdaptLoader.load( newValue, this );
			this.__imageHolder.setAttribute("src", newValue);
		}
	}
});

Object.defineProperty( DynamicImage.prototype, "parent",{
	get: function() { return this.__parent; },
	set: function(newValue) { this.__parent = newValue; this.source = this.source; }
});

Object.defineProperty( DynamicImage.prototype, "loaded",{
	get: function() { return this.__loaded; }
});

/*------------------------------------------------------------------------------------------
 * 
 * Image Gallery
 * 
 -------------------------------------------------------------------------------------------*/
function ImageGallery( id ){
	CarouselElement.call(this,id);
	this.__carousel = new Carousel( (id) + "_carousel");
	this.addChild( this.__carousel );
	
	this.__thumbnailPosition = {x:10,y:100};
	this.__mainImagePosition = {x:10,y:10};
	this.__mainImageDimensions = {x:280,y:90};
	this.__thumbnails = [];
	
	//draw the div elements
	var holder = document.createElement('div');
	holder.setAttribute('class', 'thumbnailHolder');
	holder.setAttribute('style', 'overflow:visible');
	this.__display.appendChild( holder );
	this.__thumbnailHolder = holder;
	
	this.__thumbnailsDrawn = false;
}

ImageGallery.prototype = Object.create(CarouselElement.prototype);
ImageGallery.prototype.constructor = ImageGallery;

/**
 * Methods
 */
ImageGallery.prototype.drawThumbnails = function(){
	if( this.__thumbnailsDrawn ){
		return;
	}
	for(var i=0; i<this.thumbnails.length; i++){
		this.__carousel.slides.push( this.thumbnails[i].__mainDisplay );
		var t = this;
		var temp = document.createElement('div');
		temp.setAttribute('rel', i);
		temp.setAttribute('id', 'thumb' + i);
		temp.setAttribute('class', 'linkButton');
		temp.setAttribute('style', 'left:' + (i*80) + 'px;width:78px;height:30px');
		
		this.__thumbnailHolder.appendChild( temp );
		temp.addEventListener('click', function(){
			t.__carousel.setCurrentIndex( Number(this.attributes["rel"].value) );
			t.display.dispatchEvent( createCustomEvent("onThumbnailSelected") );
		}, false);
		
		if( this.thumbnailLayout != null ){
			temp.style.left = (this.thumbnailLayout(i).left) + 'px';
			temp.style.top = (this.thumbnailLayout(i).top) + 'px';
			temp.style.width = (this.thumbnailLayout(i).width) + 'px';
			temp.style.height = (this.thumbnailLayout(i).height) + 'px';
		}
		temp.appendChild( this.thumbnails[i].__thumbnail.display );
		//trace( this.thumbnails[i].__thumbnail.parent );
		this.thumbnails[i].__thumbnail.parent = temp;
	}
	
	this.__thumbnailsDrawn = true;
	
};
ImageGallery.prototype.onSelected = function(){
	CarouselElement.prototype.onSelected.call(this);
	this.drawThumbnails();
	this.__carousel.onSelected();
};
ImageGallery.prototype.onDisplayed = function(){
	CarouselElement.prototype.onDisplayed.call(this);
	this.__carousel.onDisplayed();
};
ImageGallery.prototype.onUnSelected = function(){
	CarouselElement.prototype.onUnSelected.call(this);
	this.__carousel.onUnSelected();
};
ImageGallery.prototype.getCurrentIndex = function(){
	return this.__carousel.getCurrentIndex();
};

Object.defineProperty( ImageGallery.prototype, "thumbnailPosition",{
	get: function() { return this.__thumbnailPosition; },
	set: function(newValue) {
		this.__thumbnailPosition = newValue;
		this.__thumbnailHolder.style.left = (newValue.x) + 'px';
		this.__thumbnailHolder.style.top = (newValue.y) + 'px';
	}
});

Object.defineProperty( ImageGallery.prototype, "mainImagePosition",{
	get: function() { return this.__mainImagePosition; },
	set: function(newValue) {
		this.__mainImagePosition = newValue;
		this.__carousel.display.style.left = (newValue.x) + 'px';
		this.__carousel.display.style.top = (newValue.y) + 'px';
	}
});

Object.defineProperty( ImageGallery.prototype, "mainImageDimensions",{
	get: function() { return this.__mainImageDimensions; },
	set: function(newValue) {
		this.__mainImageDimensions = newValue;
		this.__carousel.width = (newValue.x) + 'px';
		this.__carousel.height = (newValue.y) + 'px';
	}
});

Object.defineProperty( ImageGallery.prototype, "thumbnails",{
	get: function() { return this.__thumbnails; },
	set: function(newValue) { this.__thumbnails = newValue; }
});

Object.defineProperty( ImageGallery.prototype, "thumbnailLayout",{
	get: function() { return this.__thumbnailLayout; },
	set: function(newValue) { this.__thumbnailLayout = newValue; }
});

Object.defineProperty( ImageGallery.prototype, "transition",{
	get: function() { return this.__carousel.transition; },
	set: function(newValue) { this.__carousel.transition = newValue; }
});

Object.defineProperty( ImageGallery.prototype, "autoPlay",{
	get: function() { return this.__carousel.autoPlay; },
	set: function(newValue) { this.__carousel.autoPlay = newValue; }
});

Object.defineProperty( ImageGallery.prototype, "thumbnailHolder",{
	get: function() { return this.__carousel.autoPlay; }
});

/*------------------------------------------------------------------------------------------
 * 
 * Thumbnail
 * 
 -------------------------------------------------------------------------------------------*/
function Thumbnail( thumb, main ){
	this.__thumbnail = thumb;
	this.__mainDisplay = main;
}

/*------------------------------------------------------------------------------------------
 * 
 * Video Player
 * 
 -------------------------------------------------------------------------------------------*/
function VideoPlayer(id){
	CarouselElement.call(this, id);
	this.__videoSrc = "";
	this.__poster = "";
	this.__muted = false;
	this.__autoPlay = false;
	this.__playing = false;
	
	var video = document.createElement('video');
	video.setAttribute('controls', 'true');
	video.setAttribute('style', 'width:100%;height:100%');
	this.__display.appendChild( video );
	this.__videoElement = video;
}

VideoPlayer.prototype = Object.create(CarouselElement.prototype);
VideoPlayer.prototype.constructor = VideoPlayer;

/*--------------------------------------------------------------
 * Methods
 */
VideoPlayer.prototype.play = function(){
	this.__videoElement.play();
};
VideoPlayer.prototype.stop = function(){
	this.__videoElement.pause();
	
};
VideoPlayer.prototype.restart = function(){
	this.stop();
	this.seek(0);
};
VideoPlayer.prototype.seek = function( value ){
	this.__videoElement.currentTime = value;
};

VideoPlayer.prototype.onUnSelected = function(){
	CarouselElement.prototype.onUnSelected.call(this);
	if( !this.__videoElement.paused ){
		this.__videoElement.pause();	
	}
};
VideoPlayer.prototype.onDisplayed = function(){
	CarouselElement.prototype.onDisplayed.call(this);
	if( this.autoPlay ){
		this.__videoElement.load();
		this.__videoElement.play();
	}
};

Object.defineProperty( VideoPlayer.prototype, "videoSrc",{
	get: function() { return this.__videoSrc; },
	set: function(newValue) {
		this.__videoSrc = newValue;
		this.__videoElement.setAttribute("src", newValue);
	}
});

Object.defineProperty( VideoPlayer.prototype, "poster",{
	get: function() { return this.__poster; },
	set: function(newValue) {
		this.__poster = newValue;
		this.__videoElement.setAttribute("poster", newValue);
	}
});

Object.defineProperty( VideoPlayer.prototype, "muted",{
	get: function() { return this.__muted; },
	set: function(newValue) {
		this.__muted = newValue;
		this.__videoElement.volume = this.__muted ? 0 : 1;
	}
});

Object.defineProperty( VideoPlayer.prototype, "autoPlay",{
	get: function() { return this.__autoPlay; },
	set: function(newValue) {
		this.__autoPlay = newValue;
	}
});

Object.defineProperty( VideoPlayer.prototype, "playing",{
	get: function() { return !this.__videoElement.paused; },
});

Object.defineProperty( VideoPlayer.prototype, "duration",{
	get: function() { return this.__videoElement.duration; },
});

Object.defineProperty( VideoPlayer.prototype, "time",{
	get: function() { return this.__videoElement.currentTime; },
});