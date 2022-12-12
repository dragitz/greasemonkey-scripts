// ==UserScript==
// @name         YT Description search filter-out
// @namespace    https://github.com/dragitz/
// @version      0.2
// @description  Filter out YouTube videos from search results that match a given pattern in the compact description
// @author       dragitz
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

infiniteLoop();  // start the infinite loop


function infiniteLoop() {
  setTimeout(function() {
    // code to run in the loop goes here
    
    // test
    deleteYtFormattedString(/(?=.*some WORDS HeRe)/i); // case-insensitive phrase
    
    // case-insensitive + order of words in the string doesn't matter, as long as we have >3 matches
    deleteYtFormattedString(/(?=.*password)(?=.*link)(?=.*download)/i); 
    
    // example of websites used to spread malware
    deleteYtFormattedString(/(?=.*festyy)/i);
    deleteYtFormattedString(/(?=.*gestyy)/i);
    deleteYtFormattedString(/(?=.*goo)/i);
    deleteYtFormattedString(/(?=.*yoalizer)/i);
    deleteYtFormattedString(/(?=.*blogspot)/i);
    
    // example of a more complex regex, must match them all
    /*
       - "download" followed by one or more alphanumeric characters and/or spaces, followed by the word "cheat"
       - one or more alphanumeric characters and/or spaces, followed by the word "crack" and the word "download"
       - "download" followed by one or more alphanumeric characters and/or spaces, followed by the words "mod apk"
    */
    deleteYtFormattedString(/^(download [a-zA-Z0-9\s]+ cheat|[a-zA-Z0-9\s]+ crack download|download [a-zA-Z0-9\s]+ mod apk)$/i);

    // Character often present in videos that spread malware
    deleteYtFormattedString(/(?=.*▬)/i);
    

    // Had to use a delay as the videos gets loaded after the user's page has finished loading the template (or something like this)
    
    infiniteLoop();
  }, 1000); // ms
}





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



// Function to Extract descriptions
//
// copy the function + call and paste it into the developer console
function printYtFormattedString() {
    var ytFormattedStrings = document.getElementsByClassName("metadata-snippet-text style-scope ytd-video-renderer");
    for (var i = 0; i < ytFormattedStrings.length; i++) {
        var formattedString = ytFormattedStrings[i].innerHTML;

        // Remove html related stuff
        formattedString = formattedString.replace("<span dir=\"auto\" class=\"style-scope yt-formatted-string\">", "");
        formattedString = formattedString.replace("</span><span dir=\"auto\" class=\"bold style-scope yt-formatted-string\" style-target=\"bold\">", "");
        formattedString = formattedString.replace("</span><span dir=\"auto\" class=\"style-scope yt-formatted-string\">", "");
        formattedString = formattedString.replace("</span>", "");
        formattedString = formattedString.replace("&nbsp;", "");
				formattedString = formattedString.replace("<span dir=\"auto\" class=\"bold style-scope yt-formatted-string\" style-target=\"bold\">", "");
        formattedString = formattedString.replace("</span><span dir=\"auto\" class=\"style-scope yt-formatted-string\">", "");
        formattedString = formattedString.replace("</span>", "");

        // Print the updated string to the console
        console.log(formattedString);

    }
}

printYtFormattedString()



