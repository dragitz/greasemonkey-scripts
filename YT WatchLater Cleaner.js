// ==UserScript==
// @name         YT WatchLater Cleaner
// @namespace    https://github.com/dragitz/
// @version      0.1
// @description  Clean your room bobby.
// @author       dragitz
// @match        https://www.youtube.com/playlist?list=WL
// @grant        none
// ==/UserScript==



function clickAll() {
    var elements = document.querySelectorAll('ytd-playlist-video-renderer.style-scope:nth-child(1) > div:nth-child(3) > ytd-menu-renderer:nth-child(1) > yt-icon-button:nth-child(3) > button:nth-child(1)');
    for (var i = 0; i < elements.length; i++) {
        elements[i].click();
        var menuItem = document.querySelector('ytd-menu-service-item-renderer.style-scope:nth-child(3) > tp-yt-paper-item:nth-child(1)');
        menuItem.click();
    }
}

for (var i = 0; i < 100; i++) {
    setTimeout(function() {
        clickAll();
    }, 350 * i);
}