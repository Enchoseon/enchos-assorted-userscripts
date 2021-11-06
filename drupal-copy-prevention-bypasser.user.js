// ==UserScript==
// @name     	Drupal Copy Prevention Bypasser
// @namespace   https://github.com/Enchoseon/enchos-assorted-userscripts/raw/main/drupal-copy-prevention-bypasser.user.js
// @version  	1.0.1
// @description Bypass Drupal Copy Prevention on sites that use it.
// @author   	Enchoseon
// @include  	*
// @grant    	none
// ==/UserScript==

(function() {
    "use strict";
    if (typeof Drupal !== "undefined" && typeof Drupal.behaviors.copyprevention !== "undefined") {
        console.log("Drupal site using copyprevention detected");
        Object.values(document.getElementsByClassName("copyprevention-processed")).forEach((elem) => {
            elem.style.zIndex = "69420";
            elem.replaceWith(elem.cloneNode(true)); // Extremely unclean removal of event listeners
        });
    }
})();
