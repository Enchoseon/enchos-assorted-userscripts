// ==UserScript==
// @name        Storyblocks Downloader
// @namespace   https://github.com/Enchoseon/enchos-assorted-userscripts/raw/main/storyblocks-downloader.user.js
// @version     1.0
// @description Add download link to Storyblocks previews.
// @author      Enchoseon
// @match       https://www.storyblocks.com/audio/search/*
// @grant       GM_download
// ==/UserScript==

(function() {
    "use strict";
    // =================
    // Mutation Observer
    // =================
    const observer = new MutationObserver(function(mutations_list) {
        mutations_list.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(added_node) {
                if (added_node.nodeName === "SECTION" && added_node.classList.contains("audio")) {
                    processTrack(added_node);
                }
            });
        });
    });
    observer.observe(document.querySelector("#as-search-results"), { subtree: true, childList: true });
    // ===============
    // Intercept Track
    // ===============
    function processTrack(track) {
        const downloadButton = track.querySelector("a.download-button");
        downloadButton.removeAttribute("href");
        downloadButton.addEventListener("click", () => {
            var event = new MouseEvent("click", {
                "bubbles": true,
                "cancelable": true
            });
            track.querySelector("button.audioPlayButton-button").dispatchEvent(event);
            downloadTrack(document.querySelector("audio#audio").src, downloadButton.getAttribute("aria-label").split("Download audio track ")[1]);
        });
    }
    // =================
    // Download Function
    // =================
    function downloadTrack(url, name) {
        console.log("Downloading: " + name + " (" + url + ")");
        name = name.replace(/[<>:"/\|?*]/, "_");
        GM_download(url, name);
    }
})();
