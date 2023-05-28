// ==UserScript==
// @name         YT Stop unrelated search suggestions
// @version      1.0
// @description  Remove "People also watched" and "Previously watched" sections from youtube's search results
// @match        https://www.youtube.com/*
// ==/UserScript==


function removePeopleAlsoWatchedSection() {
  const titleElement = document.querySelector('span#title.style-scope.ytd-shelf-renderer');
  if (titleElement) {
    let parentElement = titleElement.parentElement;
    while (parentElement) {
      if (parentElement.id === 'dismissible') {
        parentElement.remove();
        break;
      }
      parentElement = parentElement.parentElement;
    }
  }
}

function observeDOMChanges() {
  const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        removePeopleAlsoWatchedSection();
      }
    }
  });

  
  const bodyElement = document.querySelector('body');
  observer.observe(bodyElement, { childList: true, subtree: true });
}

observeDOMChanges();