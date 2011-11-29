// ==UserScript==
// @namespace http://hackingllama.com
// @description Sets up a character counter when writing reviews on DealExtreme. Written by Ken Saggy
// @match http://*.dealextreme.com/feedbacks/postreview.dx/sku.*
// ==/UserScript==

var textareaPros = document.getElementById("ctl00_content_txtPros");
var textareaCons = document.getElementById("ctl00_content_txtCons");
var textareaOther = document.getElementById("ctl00_content_txtOtherThoughts");
var textareaBottomline = document.getElementById("ctl00_content_txtBottomline");

function updateCounter(e) {
    var evt = (e) ? e: (window.event) ? window.event: null;
    if (evt) {
        var key = (evt.charCode) ? evt.charCode : 
		((evt.keyCode) ? evt.keyCode: ((evt.which) ? evt.which: 0));
        
		combinedLength = textareaPros.value.length + textareaCons.value.length + textareaOther.value.length + textareaBottomline.value.length
		combinedLength += 1; //plus the key we just pressed (it isn't added to value until this callback is finished, so we need to consider it manually)
		setCounter(combinedLength);
	}
	return true;
}


//just to encapsulate some view logic
function setCounter(amount) {
	
	if (amount >= 500) {
		counterDiv.style.border = '3px solid green';
	} else {
		counterDiv.style.border = '3px solid red';
	}
	
	if (amount > 9999) { counterDiv.innerHTML = 'Too long! :)'; return true; }
	counterDiv.innerHTML = amount + ' characters';
	
}


if (textareaPros != null && textareaCons != null  && textareaOther != null  && textareaBottomline != null) { //make sure we have everything we need to operate properly
	var body = document.getElementsByTagName('body')[0];
	var counterDiv = document.createElement('div'); //create our output div
	counterDiv.id = "counterDiv";
	counterDiv.style.cssText = 'position:fixed;bottom:0;right:0;\
	width:160px;\
	width: 10em;\
	margin-bottom: 20px;\
	-moz-border-radius: 4em 0em 0em 4em;\
	border-radius: 4em 0em 0em 4em;\
	border:3px solid red; background-color: #fff;\
	font-size: 16px; font-weight: bold;\
	padding: 10px 0 10px 20px; overflow: hidden;'; //style it nicely enough
	body.appendChild(counterDiv);
	setCounter(0); //just reset the interface
	
	//set some event callbacks to catch any keypresses
    textareaPros.onkeydown = 
	textareaCons.onkeydown = 
	textareaOther.onkeydown = 
	textareaBottomline.onkeydown = updateCounter;
}
