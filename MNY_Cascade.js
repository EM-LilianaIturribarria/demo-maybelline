/**
 * @author Jon
 */
var firstOpen = true;
var hidden, visibilityChange;

CSSPlugin.defaultTransformPerspective = 1000;
var unitExpanded = false;

var adaptInPage = new AdaptInPageAd();
// adaptInPage.serverConfig = new ADTECHConfig();

var adConfig = {};
adConfig.resetInPageAnimation = function(){
	setupformat();
};

adConfig.startInPageAnimation = function(){
	startTheFormat();
};

adConfig.getClickableElement = function()
{
	return null;
};

adaptInPage.adConfig = adConfig;

function getElement( id ){
	return document.getElementById( id );
	
};

var carousel;
var thirdCarousel;
var videoPlayer;
var videoSourceSet = false;
var mobileDevice = /(iPad|iPhone|iPod|Android)/i.test(navigator.userAgent);

function setupformat(){
	
	setupRolloverElement( getElement("CTA") );
	
	getElement("CloseFormat").addEventListener("click", function(event){
		ADTECH.event("CLOSE_FORMAT");
		collapseUnit();
	}, false);
	
	
	/*Set up carousel*/
	carousel = new Carousel("ImageGallery");
	carousel.width = "970px";
	carousel.height = "250px";
	
	carousel.transition = AdaptTransitions.HorizontalSlide;
	carousel.autoPlay = false;
	carousel.delay = 5500;
	carousel.slides = [new HTMLElement("Image1", ""), new HTMLElement("Image2", ""), new HTMLElement("Image3", ""), new HTMLElement("Image4", ""), new HTMLElement("Image5", "")];
	
	var d1 = new HTMLElement("Detail1", "");
	d1.selectedFunction = function(){
		onResetDetailImages(1, 6);
		onResetDetailText(1, 2);
	};
	d1.displayedFunction = function(){
		onAnimateDetailImages(1, 6);
		onAnimateDetailText(1, 2, .75);
	};
	d1.unselectedFunction = function(){
		onResetDetailImages(1, 6);
		onResetDetailText(1, 2);
	};
	
	var d2 = new HTMLElement("Detail2", "");
	d2.selectedFunction = function(){
		onResetDetailImages(2, 4);
		onResetDetailText(2, 2);
	};
	d2.unselectedFunction = function(){
		onResetDetailImages(2, 4);
		onResetDetailText(2, 2);
	};
	d2.displayedFunction = function(){
		onAnimateDetailImages(2, 4);
		onAnimateDetailText(2, 2, 0);
	};
	
	var d3 = new HTMLElement("Detail3", "");
	d3.selectedFunction = function(){
		onResetDetailImages(3, 5);
		onResetDetailText(3, 2);
	};
	d3.unselectedFunction = function(){
		onResetDetailImages(3, 5);
		onResetDetailText(3, 2);
	};
	d3.displayedFunction = function(){
		onAnimateDetailImages(3, 5);
		onAnimateDetailText(3, 2, .75);
	};
	
	var d4 = new HTMLElement("Detail4", "");
	d4.selectedFunction = function(){
		onResetDetailImages(4, 6);
		onResetDetailText(4, 3);
	};
	d4.unselectedFunction = function(){
		onResetDetailImages(4, 6);
		onResetDetailText(4, 3);
	};
	d4.displayedFunction = function(){
		onAnimateDetailImages(4, 6);
		onAnimateDetailText(4, 3, .75);
	};
	
	var d5 = new HTMLElement("Detail5", "");
	d5.selectedFunction = function(){
		onResetDetailImages(5, 5);
		onResetDetailText(5, 3);
	};
	d5.unselectedFunction = function(){
		onResetDetailImages(5, 5);
		onResetDetailText(5, 3);
	};
	d5.displayedFunction = function(){
		onAnimateDetailImages(5, 5);
		onAnimateDetailText(5, 3, .75);
	};
	
	thirdCarousel = new Carousel("DetailGallery");
	thirdCarousel.width = "970px";
	thirdCarousel.height = "250px";
	
	thirdCarousel.transition = AdaptTransitions.HorizontalSlide;
	thirdCarousel.autoPlay = false;
	thirdCarousel.delay = 5500;
	thirdCarousel.slides = [d1, d2, d3, d4, d5];
	
	getElement("Next").addEventListener("click", onNextImage, false);
	getElement("Prev").addEventListener("click", onPrevImage, false);
	
	getElement("CTA2").addEventListener("click", function(event){
		onClickThrough("PRODUCT_1");
	}, false);
	getElement("CTA2_2").addEventListener("click", function(event){
		onClickThrough("PRODUCT_2");
	}, false);
	getElement("CTA2_3").addEventListener("click", function(event){
		onClickThrough("PRODUCT_3");
	}, false);
	getElement("CTA2_4").addEventListener("click", function(event){
		onClickThrough("PRODUCT_4");
	}, false);
	getElement("CTA2_5").addEventListener("click", function(event){
		onClickThrough("PRODUCT_5");
	}, false);
	
	getElement("DetailCTA2").addEventListener("click", function(event){
		onClickThrough("PRODUCT_1");
	}, false);
	getElement("DetailCTA2_2").addEventListener("click", function(event){
		onClickThrough("PRODUCT_2");
	}, false);
	getElement("DetailCTA2_3").addEventListener("click", function(event){
		onClickThrough("PRODUCT_3");
	}, false);
	getElement("DetailCTA2_4").addEventListener("click", function(event){
		onClickThrough("PRODUCT_4");
	}, false);
	getElement("DetailCTA2_5").addEventListener("click", function(event){
		onClickThrough("PRODUCT_5");
	}, false);
	
	/*--------------------------------------------------------------------------------
	 * Select Buttons
	 */
	getElement("Select1").addEventListener("click", function(event){
		selectCarousel( 0 );
	}, false);
	
	getElement("Select2").addEventListener("click", function(event){
		selectCarousel( 1 );
	}, false);
	
	getElement("Select3").addEventListener("click", function(event){
		selectCarousel( 2 );
	}, false);
	
	getElement("Select4").addEventListener("click", function(event){
		selectCarousel( 3 );
	}, false);
	
	getElement("Select5").addEventListener("click", function(event){
		selectCarousel( 4 );
	}, false);
	
	
	/*Pause Carousel on Tab Focus*/
	if (/*@cc_on!@*/false) { // check for Internet Explorer
		document.onfocusin = onFocus;
      	document.onfocusout = onBlur;
  	} else {
    	window.onfocus = onFocus;
    	window.onblur = onBlur;
    	window.addEventListener("pageshow", function(evt){
            onFocus();
    	}, false);
    	window.addEventListener("pagehide", function(evt){
       		onBlur();
    	}, false);
  	}
  	
  	if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
		hidden = "hidden";
		visibilityChange = "visibilitychange";
	} else if (typeof document.mozHidden !== "undefined") {
		hidden = "mozHidden";
		visibilityChange = "mozvisibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
	}
	  
	if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
	} else {
		// Handle page visibility change   
	    document.addEventListener(visibilityChange, handleVisibilityChange, false);
	}
}

/*Handle tab visibility*/
function handleVisibilityChange() {
  if (document[hidden]) {
    onBlur();
  } else {
  	if( !unitExpanded ){
  		return;
  	}
    //carousel.start();
  }
}

function onBlur() {
	
	//carousel.pause();
};
function onFocus(){
};

function startTheFormat(){
	var speed = .8;
	
	getElement("FindOutMore").style.opacity = 1;
	TweenLite.from( getElement("FindOutMore"), speed, {opacity:0, delay:1.7});
	
	getElement("Heading").style.opacity = 1;
	TweenLite.from( getElement("Heading"), speed+.4, {opacity:0, delay:0});
	
	getElement("Rollover").style.opacity = 1;
	TweenLite.from( getElement("Rollover"), speed, {opacity:0, delay:2.8, onComplete:function(){
		pulseElement( getElement("Rollover") );
	}});
	
	
	carousel.onSelected();
	carousel.onDisplayed();
	
	
	var division = 1.5;
	TweenLite.to(getElement("Prod1"), speed/division, {right:0, delay:.3});
	TweenLite.to(getElement("Prod2"), speed/division, {right:0, delay:.5});
	TweenLite.to(getElement("Prod3"), speed/division, {right:0, delay:.7});
	TweenLite.to(getElement("Prod4"), speed/division, {right:0, delay:.9});
	TweenLite.to(getElement("Prod5"), speed/division, {right:0, delay:1.1});
	TweenLite.to(getElement("Prod6"), speed/division, {right:0, delay:1.3});
	
}

/* Sidewinder functions */
function onPreExpandStarted(){
	getElement("RollPreloader").style.visibility = "visible";
}

function onPreExpandEnded(){
	getElement("RollPreloader").style.visibility = "hidden";
}

function onExpandUnit(){
	onEndRolloverTimer();
	expandUnit();
}

function expandUnit(){
	if( unitExpanded ){
		onClickThrough("MAIN_CLICK");
		return;
	}
	unitExpanded = true;
	ADTECH.expand();
	startTheSideWinder();
}

function startTheSideWinder(){
	CascadeTransition( getElement('Panel2'), this.expandPanel3 );
	TweenLite.killTweensOf( getElement("Rollover") ); 	
	TweenLite.to(getElement("Rollover"), .5, {opacity:0});
}

function expandPanel3(){
	CascadeTransition( getElement('Panel3'), onExpandComplete );
	if( firstOpen ){
		firstOpen = false;
		thirdCarousel.onSelected();
		thirdCarousel.onDisplayed();
	}else{
		thirdCarousel.getCurrentDisplay.selectedFunction();
		thirdCarousel.getCurrentDisplay.displayedFunction();
	}
	
}

function onExpandComplete(){
//	console.log("finally here");
	//carousel.autoPlay = true;
	//carousel.start();
	getElement("CloseFormat").style.visibility = "visible";
	getElement("CloseFormat").style.opacity = 1;
	TweenLite.from( getElement("CloseFormat"), .7, {css:{opacity:0}});
}

function collapseUnit(){
	if( unitExpanded == false){
		return;
	}
	
	getElement("CloseFormat").style.visibility = "hidden";
	TweenLite.killDelayedCallsTo(resetImageAnimation);
	
	startSidewinderClose();
	
}

function startSidewinderClose(){
	CloseCascade( getElement('Panel3'), collapsePanel2);
}

function collapsePanel2(){
	CloseCascade( getElement('Panel2'), onCollapseComplete);
}

function onCollapseComplete(){
	ADTECH.contract();
	unitExpanded = false;
	pulseElement( getElement("Rollover") );
}

function pulseElement( element ){
	TweenMax.to( element, .5, {css:{top:220, opacity:1}, delay:.5, onComplete:function(){
		TweenMax.to( element, .5, {css:{top:205, opacity:1}, onComplete:function(){
			pulseElement( element );
		}});
	}});
}

/*clickThroughs*/
function neverCalled(){
	ADTECH.click("PRODUCT_1");
	ADTECH.click("PRODUCT_2");
	ADTECH.click("PRODUCT_3");
	ADTECH.click("PRODUCT_4");
	ADTECH.click("PRODUCT_5");
	ADTECH.click("MAIN_CLICK");
}


function onClickThrough( click ){
	collapseUnit();
	ADTECH.click( click );
}

/*-------------------------------------------------------------------
 * Carousel Functions
 */
function onNextImage( event ){
	ADTECH.event("NEXT");
	navigateCarousel( 1 );
}

function onPrevImage( event ){
	ADTECH.event("PREV");
	navigateCarousel( -1 );
}

function navigateCarousel( num ){
	TweenLite.killDelayedCallsTo(resetImageAnimation);
	AdaptTransitions.transitionDirection = num > 0;
	var temp = carousel.getCurrentIndex() + num;
	if( temp < 0 ){
		temp = carousel.slides.length - 1;
	}
	if( temp >= carousel.slides.length ){
		temp = 0;
	}
	
	moveCarousel( temp, !AdaptTransitions.transitionDirection );
	/*carousel.pause();
	carousel.setCurrentIndex( temp );
	
	AdaptTransitions.transitionDirection = !AdaptTransitions.transitionDirection;
	thirdCarousel.pause();
	thirdCarousel.setCurrentIndex( temp );*/
}

function moveCarousel( index, direction ){
	carousel.pause();
	carousel.setCurrentIndex( index );
	
	AdaptTransitions.transitionDirection = direction;
	thirdCarousel.pause();
	thirdCarousel.setCurrentIndex( index );
}

function selectCarousel( index ){
	AdaptTransitions.transitionDirection = index > carousel.getCurrentIndex();
	moveCarousel( index, !AdaptTransitions.transitionDirection );
}


function onResetDetailImages( index, num ){
	TweenLite.killDelayedCallsTo(resetImageAnimation);
	for( var i=1; i<=num; i++){
		console.log( "ProdDet" + index + "_" + i );
		getElement("ProdDet" + index + "_" + i).style.opacity = 0;
	}
	getElement("ProdDet" + index + "_1").style.opacity = 1;
}

function onAnimateDetailImages( index, num ){
	currentLoopIndex = index;
	currentLoopNum = num;
	for( var i=2; i<=num; i++){
		var obj={opacity:1, delay:i*.75};
		if(i==num){
			obj.onComplete = loopImages;
		}
		TweenLite.to( getElement("ProdDet" + index + "_" + i), .1, obj);
	}
}

function onResetDetailText( index, num ){
	for( var i=1; i<=num; i++){
		console.log( "ProdText" + index + "_" + i );
		getElement("ProdText" + index + "_" + i).style.opacity = 0;
	}
	//getElement("ProdText" + index + "_1").style.opacity = 1;
}

function onAnimateDetailText( index, num, delay ){
	if( delay == null || delay == undefined ){
		delay = 0;
	}
	for( var i=1; i<=num; i++){
		TweenLite.to( getElement("ProdText" + index + "_" + i), .3, {opacity:1, delay:(i*.75) + .75 + delay});
	}
}

var currentLoopIndex;
var currentLoopNum;
function loopImages(){
	console.log("loop");
	TweenLite.delayedCall(8, resetImageAnimation);
}

function resetImageAnimation(){
	onResetDetailImages(currentLoopIndex, currentLoopNum);
	onAnimateDetailImages(currentLoopIndex, currentLoopNum);
}

