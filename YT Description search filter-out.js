// ==UserScript==
// @name         YT Description search filter-out
// @namespace    https://github.com/dragitz/
// @version      0.1
// @description  Filter out YouTube videos from search results that match a given pattern in the compact description
// @author       dragitz
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

function deleteYtFormattedString(pattern) {

    var ytFormattedStrings = document.getElementsByClassName("metadata-snippet-text style-scope ytd-video-renderer");
    for (var i = 0; i < ytFormattedStrings.length; i++) {

        if (ytFormattedStrings[i].innerHTML.match(pattern)) {

            // Get the parent element of the comment
            var parent = ytFormattedStrings[i].parentElement;
            
            // Keep getting the parent element until you reach the root element with the ID "dismissible"
            while (parent && parent.id !== "dismissible") {
                parent = parent.parentElement;
            }
            // If the root element was found, remove it
            if (parent) {
                parent.remove();
            }
        }

    }
}



function infiniteLoop() {
  setTimeout(function() {
    // code to run in the loop goes here
    
    // 
    deleteYtFormattedString(/(?=.*password)(?=.*link)(?=.*download)/i);
    deleteYtFormattedString(/(?=.*festyy)/i);
    deleteYtFormattedString(/(?=.*gestyy)/i);
    deleteYtFormattedString(/(?=.*goo)/i);
    deleteYtFormattedString(/(?=.*yoalizer)/i);
    deleteYtFormattedString(/(?=.*blogspot)/i);
    deleteYtFormattedString(/(?=.*http)/i);
    deleteYtFormattedString(/(?=.*https)/i);
    deleteYtFormattedString(/(?=.*hxxp)/i);
    deleteYtFormattedString(/^(download [a-zA-Z0-9\s]+ cheat|[a-zA-Z0-9\s]+ crack download|download [a-zA-Z0-9\s]+ mod apk)$/i);
    deleteYtFormattedString(/(?=.*DOWNLOAD HERE)/i);

    deleteYtFormattedString(/(?=.*▬)/i);

    infiniteLoop();  // call the infiniteLoop() function again to continue the loop
  }, 1000);  // the loop will run every 1000 milliseconds, or 1 second
}

infiniteLoop();  // start the infinite loop

