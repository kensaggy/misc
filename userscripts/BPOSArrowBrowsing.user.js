// ==UserScript==
// @namespace http://hackingllama.com
// @description Allows to browse through emails using the Up & Down arrow keys in MicrosoftOnline's Webmail Interface. Written by Ken Saggy
// @match https://*.mail.emea.microsoftonline.com/*
// ==/UserScript==

//human usuable interface, thank you Microsoft!

function keyPress(e) {
    var evt = (e) ? e: (window.event) ? window.event: null;
    if (evt) {
        var key = (evt.charCode) ? evt.charCode:
        ((evt.keyCode) ? evt.keyCode: ((evt.which) ? evt.which: 0));
        if (key == "38") {
            prevLink.onclick(); //capture "up arrow", should trigger onClkTb('previous');
        }

        if (key == "40") { //capture "down arrow", should trigger onClkTb('next')
            nextLink.onclick(); //trigger than onclick event the html has..
        }
        
        if (key == "46") { //capture delete key (fn+backspace on Mac), should trigger onClkTb('delete'); 
            deleteLink.onclick();s
        }
        
        return false;
    }
}


var nextLink = document.getElementById("lnkHdrnext");
var prevLink = document.getElementById("lnkHdrprevious");
var deleteLink = document.getElementById("lnkHdrdelete");

if (nextLink != null && prevLink != null) {
    document.onkeydown = keyPress;
}


//so long and thanks for all the fish
