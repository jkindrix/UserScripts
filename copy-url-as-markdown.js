// ==UserScript==
// @name         Copy URL as markdown
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Copy a page's h1 text and URL and convert it to a markdown link
// @author       Justin Kindrix
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @run-at       document-end
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';

    $("body").append(`<div id="copycurrentpageurl"></div>`);

//--- Style our newly added elements using CSS.
GM_addStyle(`
    :root {
        --icon-url: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTYgMUg0Yy0xLjEgMC0yIC45LTIgMnYxNGgyVjNoMTJWMXptMyA0SDhjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTFjMS4xIDAgMi0uOSAyLTJWN2MwLTEuMS0uOS0yLTItMnptMCAxNkg4VjdoMTF2MTR6Ii8+PC9zdmc+);
    }

    #copycurrentpageurl {
        width:30px;
        height:100vh;
        position:fixed;
        top:0px;
        left:0px;
        z-index:100000000000000000000000000000000;
    }

    #copycurrentpageurl::after {
display: block;
content:"";
        width:50px;
        height:100vh;
        background:#212121 var(--icon-url) 50% 50%/50% no-repeat;
        position:fixed;
        top:0px;
        left:0px;
        transform:translate(-50px);
        transition:transform 150ms cubic-bezier(0,0,0,1);
        cursor:pointer;
    }

    #copycurrentpageurl:hover::after {
        transform:translate(0,0);
        box-shadow:0 0 20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.1) inset;
    }

    #copycurrentpageurl:active::after {
        background:#2979FF var(--icon-url) 50% 50%/50% no-repeat;
        transform:translate(0,0);
        box-shadow:0 0 20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.1) inset;
    }
`);

    // document.getElementById("#copycurrentpageurl").click(copyToClipboard);
    $("#copycurrentpageurl").click(function(){
        copyToClipboard();
    });


    function copyToClipboard() {
        // var $temp = $("<input>");
        // $("body").append($temp);
        // $temp.val(window.location.href).select();
        // document.execCommand("copy");
        // $temp.remove();

        var title = $('h1').text().trim();
        var url = window.location.href;

        var markdownLink = '[' + title + '](' + url + ')';
        // var markdownLink = `[${titleText}](${url})`;

        GM_setClipboard(markdownLink);

    }

})();
