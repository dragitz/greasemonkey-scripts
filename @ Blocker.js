// ==UserScript==
// @name         "@" Block
// @version      1.0
// @description  Prevent pages containing "@" in the url from being loaded
// ==/UserScript==

function block() {
  var currentUrl = window.location.href;

  if (currentUrl.includes('@')) {
    window.stop();

    document.body.innerHTML = "<h1>Access Denied</h1><p>The URL contains the '@' symbol.</p>";
  }
}

// Call the function when the page finishes loading
window.addEventListener('load', block);
