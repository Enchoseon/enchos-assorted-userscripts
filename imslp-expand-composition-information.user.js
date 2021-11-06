// ==UserScript==
// @name        IMSLP Expand Composition Information
// @namespace   https://github.com/Enchoseon/enchos-assorted-userscripts/blob/main/imslp-expand-composition-information.user.js
// @version     1.0.1
// @description Expands composition information in the IMSLP library.
// @author      Enchoseon
// @include     *imslp.org/wiki/Category:*
// @run-at      document-end
// @grant       none
// ==/UserScript==

(function() {
    "use strict";
    // ==============================
    // Expand Composition Information
    // ==============================
    expandCompositionInformation();
    document.getElementById("cathassecselp1").addEventListener("click", function (event) {
        expandCompositionInformation();
    }, true);
    function expandCompositionInformation() {
        Object.values(document.getElementById("mw-pages").getElementsByTagName("li")).forEach((elem) => {
            elem.dispatchEvent(new Event("mouseover"));
            window.addEventListener("mouseout", function (event) {
                event.stopPropagation();
            }, true);
        });
    }
    // ============
    // Style Tweaks
    // ============
    const css = `
        .showHSList a {
            font-weight: bold;
        }
    `;
    var s = document.createElement("style");
    s.setAttribute("type", "text/css");
    s.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(s);
})();
