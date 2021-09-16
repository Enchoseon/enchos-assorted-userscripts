// ==UserScript==
// @name     	Disable Scroll Event in Google Slides When Using Touchpad
// @version  	1.0.0
// @description Removes scroll event from #workspace-container in Google Slides when a touchpad is detected.
// @author   	Enchoseon
// @include  	*docs.google.com/presentation/d/*
// @grant    	none
// ==/UserScript==

(function () {
    "use strict";
    function killScrollEvent() {
        if (document.getElementById("workspace-container") !== null) {
            window.addEventListener(
                "wheel",
                function (event) {
                    event.stopImmediatePropagation();
                },
                true
            );
        }
    }
    function detectTrackPad(e) { // https://stackoverflow.com/a/62415754
        if (e.wheelDeltaY) {
            if (e.wheelDeltaY === (e.deltaY * -3)) {
                killScrollEvent();
            }
        } else if (e.deltaMode === 0) {
            killScrollEvent();
        }
    }
    document.addEventListener("mousewheel", detectTrackPad, false);
    document.addEventListener("DOMMouseScroll", detectTrackPad, false);
})();
