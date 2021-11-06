// ==UserScript==
// @name     	Greasy Fork Search Result Blacklist
// @namespace   https://github.com/Enchoseon/enchos-assorted-userscripts/raw/main/greasy-fork-search-result-blacklist.user.js
// @version  	1.0.1
// @description Remove irrelevant searches from Greasyfork.org.
// @author   	Enchoseon
// @include  	*greasyfork.org*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant    	none

(function() {
    "use strict";
    // Default/demo blacklist
    var blacklistArr = GM_getValue("blacklistArr", [
        "agario",
        "vengeio",
        "survivio",
        "zombsio",
        "florrio",
        "vanisio",
        "diepio",
        "mopeio",
        "gotaio",
        "blobleio",
        "vertixio",
        "powerlineio",
        "unlimitedammo",
        "infinitejump",
        "autokill",
        "autoheal",
        "instakill",
        "krunker",
        "moomoo",
        "aimbot",
        "justfalllol",
        "kahoot",
        "shellshockers",
        "brofistio",
        "cursorsio",
        "vanisio",
        "slitherio",
        "starveio",
        "vanisio",
        "foesio",
        "balzio",
    ]);
    // Run at start
    checkBlacklist(blacklistArr, true);
    // Sidebar input
    if (document.getElementById("script-list-option-groups") !== null) {
        document.getElementById("script-list-option-groups").outerHTML += `<div>Blacklist Terms:
            <textarea id="blacklistTextareaElem" style="height:69em">` + blacklistArr.join("\n") + `</textarea>
        </div>`;
        document.getElementById("blacklistTextareaElem").addEventListener("input", function(){
            blacklistArr = this.value.split("\n");
            if (blacklistArr.length === 1 && blacklistArr[0] === "") { // Load default blacklist if empty
                GM_deleteValue("blacklistArr");
                return;
            }
            checkBlacklist(blacklistArr, true);
            GM_setValue("blacklistArr",blacklistArr);
        });
    }
    // Enforce the blacklist
    function checkBlacklist(inputArr, stripBool) {
        if (stripBool) {
            for (var i = 0; i < inputArr.length; i++) {
                inputArr[i] = inputArr[i].replace(/\./g,"").replace(/\s/g,"")
            }
        }
        var blacklistRegex = new RegExp(inputArr.join( "|" ), "i");
        Object.values(document.getElementsByClassName("script-list")).forEach((scriptListElem) => {
            Object.values(document.getElementsByTagName("li")).forEach((itemElem) => {
                if (typeof itemElem.dataset.scriptName !== "undefined") {
                    var resultStr = "block";
                    if (stripBool) {
                        itemElem.dataset.scriptName = itemElem.dataset.scriptName
                            .replace(/\./g,"")
                            .replace(/\s/g,"");
                    }
                    if (blacklistRegex.test(itemElem.dataset.scriptName)) {
                        resultStr = "none";
                    }
                    itemElem.style.display = resultStr;
                }
            });
        });
    }
})();
