// ==UserScript==
// @name     	Drupal Copy Prevention Bypasser
// @namespace	https://github.com/Enchoseon/enchos-assorted-userscripts/blob/main/drupal-copy-prevention-bypasser.js
// @version  	1.0.-
// @description  Bypass Drupal Copy Prevention on sites that use it.
// @author   	Enchoseon
// @include  	*
// @grant    	none
// ==/UserScript==

(function() {
    'use strict';
    if (typeof Drupal !== "undefined") { // Unelegant if nest to prevent errors from appearing in console on non-Drupal sites
        if (typeof Drupal.behaviors.copyprevention !== "undefined") {
            console.log("Drupal Copyprevention Bypasser: Drupal site using copyprevention detected");
            Object.values(document.getElementsByClassName("copyprevention-processed")).forEach((elem) => {
                elem.style.zIndex = "69420";
                elem.replaceWith(elem.cloneNode(true)); // Extremely lazy removal of event listeners
            });
        }
    }
})();
