/**
 * @author Jon
 */
/*
 * Adserver config options
 */
function AdserverConfiguration(){

	//this.__setupFunction = null;
	//this.__clickFunction = null;
}

Object.defineProperty( AdserverConfiguration.prototype, "setupFunction",{
	get: function() { return this.__setupFunction; },
  	set: function(newValue) { this.__setupFunction = newValue; }
});

Object.defineProperty( AdserverConfiguration.prototype, "clickFunction",{
	get: function() { return this.__clickFunction; },
  	set: function(newValue) { this.__clickFunction = newValue; }
});

// function ADTECHConfig(){
// 	AdserverConfiguration.call(this);
	
// 	this.__setupFunction = this.setupAd;
// 	this.__clickFunction = this.clickThrough;
	
// }

// ADTECHConfig.prototype = Object.create(AdserverConfiguration.prototype);
// ADTECHConfig.prototype.constructor = ADTECHConfig;

// ADTECHConfig.prototype.setupAd = function( func ){
// 	console.log( "setup the adtech ad" );
// 	ADTECH.ready( func );
// };

// ADTECHConfig.prototype.clickThrough = function( exit ){
// 	console.log( "clickthrough" );
// 	ADTECH.click( exit );
// };

/*----------------------------------------------------------------------------
 * 
 * 
 * Adapt In Page Ad
 -----------------------------------------------------------------------------*/
function AdaptInPageAd(){
	this.__serverConfig = null;
	this.__adConfig = null;
	this.__onAdReadyComplete = this.defaultAdReady;
	this.__adsetupComplete = false;
	this.__preloadComplete = false;
	
	window.onload = this.onPreloadComplete.bind(this);
}

AdaptInPageAd.prototype.setupReady = function(){
	console.log("set up done");
	if( this.__adConfig != null ){
		this.__adConfig.resetInPageAnimation();
		this.setUpClickElement();
	}
	
	
	this.__adsetupComplete = true;
	this.onAdReady();
};

AdaptInPageAd.prototype.setUpClickElement = function(){
	var clickableDiv = this.__adConfig.getClickableElement();
	if( clickableDiv == null ){
		return;
	}
	
	if (clickableDiv.addEventListener)
	{
		clickableDiv.addEventListener("click", this.mainClickThrough.bind(this), false);
	}
	else
	{
		clickableDiv.attachEvent("onclick", this.mainClickThrough.bind(this) );
	}
};

AdaptInPageAd.prototype.mainClickThrough = function(event){
	this.clickThrough("MAIN_CLICK");
};

AdaptInPageAd.prototype.clickThrough = function(event){
	if( this.__serverConfig == null ){
		return;
	};
	this.__serverConfig.clickFunction( event );
};

AdaptInPageAd.prototype.onPreloadComplete = function(){
	this.__preloadComplete = true;
	this.onAdReady();
};

AdaptInPageAd.prototype.onAdReady = function(){
	if( !this.__preloadComplete){
		return;
	}
	console.log("all good to go");
	if( this.__onAdReadyComplete != null ){
		this.__onAdReadyComplete.call(this);
	}
};

AdaptInPageAd.prototype.defaultAdReady = function(){
	TweenLite.to('#Preloader', .3, {autoAlpha:0, delay:.5});
	TweenLite.to('#AdContainer', .5, {autoAlpha:1, delay:0});
	TweenLite.delayedCall(.5, this.__adConfig.startInPageAnimation);
};

Object.defineProperty( AdaptInPageAd.prototype, "onAdReadyComplete",{
	get: function() { return this.__onAdReadyComplete; },
  	set: function(newValue) { this.__onAdReadyComplete = newValue; }
});