// ==UserScript==
// @name         "@" Block
// @version      1.0
// @description  Prevent pages containing "@" in the url from being loaded
// ==/UserScript==

function blockPageIfUrlContainsAtSymbol() {
  var currentUrl = window.location.href;

  // Some medium articles might get blocked if we do not add this extra check. 
  if (!currentUrl.includes('/@') && currentUrl.includes('@')) {
    window.stop();

    document.body.innerHTML = "<h1>Access Denied</h1><p>The URL contains the '@' symbol without a slash before it.</p>";
  }
}

window.addEventListener('load', blockPageIfUrlContainsAtSymbol);
