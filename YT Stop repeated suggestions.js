// ==UserScript==
// @name         YT Stop repeated suggestions
// @version      1.0
// @description  Greasemonkey script that stores YouTube video URLs in a database and deletes videos that appear more than X times
// @match        https://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

	const HIDE_AFTER = 4;
    
    const reloadRandomId = Math.floor((Math.random() * 9000) + 1);
    const DB_NAME = 'seen_videos';

	// type localStorage.clear() in console to clear your db
    let videoURLs = JSON.parse(localStorage.getItem(DB_NAME)) || {};
	
	// if we click on a video, we reset its score
	if (videoURLs[window.location.href])
	{		
		videoURLs[window.location.href].score = 0;
	}
 
  	
    function storeVideoURL(url, reloadRandomId) {
        
        if(!videoURLs[url])
        {
            videoURLs[url] = {
                reloadRandomId: reloadRandomId,
                score: 1
            };
            console.log("Added (new): ",url, " Score: ", videoURLs[url].score, " id: ",reloadRandomId);

        }
        else
        {
            // only add score, if the reload id isn't the same as the current one
            if (videoURLs[url].reloadRandomId !== reloadRandomId && videoURLs[url].score < HIDE_AFTER) {
                videoURLs[url].score = videoURLs[url].score + 1;
                videoURLs[url].reloadRandomId = reloadRandomId;
                console.log("Added (increased): ",url, " Score: ", videoURLs[url].score, " id: ",videoURLs[url].reloadRandomId);
            }
        }

        localStorage.setItem(DB_NAME, JSON.stringify(videoURLs));
    }

    // delete videos that appear more than X times
    function deleteVideos() {
        const videoRenderers = document.querySelectorAll('ytd-compact-video-renderer.style-scope.ytd-item-section-renderer');
        videoRenderers.forEach(videoRenderer => {
            const videoLink = videoRenderer.querySelector('a.yt-simple-endpoint.style-scope.ytd-compact-video-renderer');
            if (videoLink && videoURLs[videoLink.href].score >= HIDE_AFTER) {
                videoRenderer.remove();
              
              // remove glitched spinners
              const spinners = document.querySelectorAll('tp-yt-paper-spinner.ytd-continuation-item-renderer');
              spinners.forEach(element => {
                const parentNode = element.parentNode;
                parentNode.removeChild(element);
              });

            }
        });
    }

    // Check all video links on page load and store their URLs in the database
    function updateVideoURLs(reloadRandomId) {
        const videoLinks = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-compact-video-renderer');
        videoLinks.forEach(videoLink => {
            storeVideoURL(videoLink.href, reloadRandomId);
        });
        deleteVideos();
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === "contents") {
                updateVideoURLs(reloadRandomId);
            }
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    // it's a personal choice, in case something goes wrong
    window.onload = function() {
        setTimeout(function() {
			updateVideoURLs(reloadRandomId);
        }, 3500);
    };
})();	