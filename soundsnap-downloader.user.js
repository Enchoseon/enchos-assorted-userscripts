// ==UserScript==
// @name        Soundsnap Downloader
// @namespace   https://github.com/Enchoseon/enchos-assorted-userscripts/raw/main/soundsnap-downloader.user.js
// @version     0.7.1
// @description Add download link to Soundsnap previews.
// @author      Enchoseon
// @include     *soundsnap.com/search/audio?*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
    "use strict";
    // =================
    // Mutation Observer
    // =================
    var flag = false;
    const observer = new MutationObserver(function(mutations_list) {
        mutations_list.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(added_node) {
                if (added_node.id === "page-loader") {
                    flag = false;
                }
                if (added_node.className === "ojoo-teaser") {
                    if (flag) {
                        return;
                    } else {
                        flag = true;
                        start();
                    }
                }
            });
        });
    });
    observer.observe(document, { subtree: true, childList: true });
    function start() {
        // =========================
        // Intercept Download Button
        // =========================
        const tracks = document.querySelectorAll("div.ojoo-teaser");
        tracks.forEach((track) => {
            const downloadButton = track.querySelector("a.ss_icons.ss_download");
            console.log(downloadButton);
            downloadButton.removeAttribute("href");
            downloadButton.addEventListener("click", () => {
                var event = new MouseEvent("mouseover", {
                    "bubbles": true,
                    "cancelable": true
                });
                track.querySelector("span.ojoo-play").dispatchEvent(event);
                downloadTrack(track.querySelector("audio").src, track.querySelector("div.audio-description").innerHTML);
            });
        });
        // =================
        // Download Function
        // =================
        function downloadTrack(url, name) {
            console.log("Downloading: " + name + " (" + url + ")");
            window.open(url);
        }
    }
})();
