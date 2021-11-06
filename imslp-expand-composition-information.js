// ==UserScript==
// @name         IMSLP Expand Composition Information
// @version      1.0.0
// @description  Expands composition information in the IMSLP library.
// @author       Enchoseon
// @include      *imslp.org/wiki/Category:*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Object.values(document.getElementById("mw-pages").getElementsByTagName("li")).forEach((elem) => {
        elem.dispatchEvent(new Event("mouseover"));
        window.addEventListener("mouseout", function (event) {
            event.stopPropagation();
        }, true);
    });
})();
