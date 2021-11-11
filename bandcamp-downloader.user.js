// ==UserScript==
// @name        Bandcamp Downloader
// @namespace   https://github.com/Enchoseon/enchos-assorted-userscripts/raw/main/bandcamp-downloader.user.js
// @version     0.6.9
// @description Add download link to Bandcamp tracks.
// @author      Enchoseon
// @include     *bandcamp.com/track*
// @grant       GM_download
// ==/UserScript==

(function() {
    "use strict";
    // ======================
    // Create Download Button
    // ======================
    var downloadElem = document.createElement("li");
    downloadElem.innerHTML += "<span><a><b>Download</a></a></span>";
    downloadElem.addEventListener("click", downloadTrack);
    document.querySelector(".share-collect-controls ul").appendChild(downloadElem);
    // ==================
    // Download Functions
    // ==================
    function downloadTrack() {
        const src = document.querySelector("audio").src;
        if (src === "") {
            alert("Press the play button first!");
            return;
        }
        console.log("Downloading: " + src);
        GM_download({
            url: src,
            name: getFilename(),
        })
    }
    function getFilename() {
        const track = getElemInnerHTML(".trackTitle");
        const album = getElemInnerHTML(".albumTitle .fromAlbum");
        const artist = getElemInnerHTML(".albumTitle span:nth-child(2) a");
        return track + "-" + album + "-" + artist + ".mp3";
    }
    function getElemInnerHTML(query) {
        return document.querySelector(query)
                       .innerHTML
                       .trim()
                       .replace(/[^a-z0-9]/gi, "-") // Make filesafe strings (https://stackoverflow.com/a/8485137)
                       .toLowerCase();
    }
})();
