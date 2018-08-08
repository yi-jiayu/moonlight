'use strict';

// same media query as the one in style.css
const q = window.matchMedia('(min-width: 700px)');

// tolerance for element.getBoundingClientRect precision
const tol = 1;

// height of a single line of paragraph text. this value will be updated whenever it changes
let lineHeight;

// state variable for remembering the last key pressed
let prevKey;

/*
get the last element whose top edge is above the viewport by a certain tolerance, for example:

 |__________|   element <- gets this element
--------------  top of viewport
  __________
 |          |   another element

also works if the element is partially on screen:

  __________
 |          |
--------------  top of viewport
 |__________|   element partially in view <- gets this element
  __________
 |          |   another element

 if there are no elements above the viewport, returns the document body
*/
function getPrevElement(elements) {
  let prev = document.body;
  for (const el of elements) {
    if (el.getBoundingClientRect().top >= -tol) {
      break;
    }
    prev = el;
  }
  return prev;
}

// gets the first element whose top edge is under the viewport top edge by a certain tolerance
function getNextElement(elements) {
  for (const el of elements) {
    if (el.getBoundingClientRect().top > tol) {
      return el;
    }
  }
  return null;
}

// takes a query selector and updates the line height based on whether it applies
// this is highly coupled to the current style.css
// the default font size is 16px, but is increased to 18px when the width of the page is greater than 700px
// since our paragraph line height is 1.75, this makes the line height 28px and 31.5px respectively
function updateLineHeight(q) {
  if (q.matches) {
    lineHeight = 31.5;
  } else {
    lineHeight = 28;
  }
}

// use the children of certain nodes as paragraphs
const parent = (document.querySelector('.article-list') || document.querySelector('.article-body'));
const elements = parent ? parent.children : null;

updateLineHeight(q);
q.addListener(updateLineHeight);

document.addEventListener('keypress', e => {
  let el;
  switch (e.key) {
    case '1':
      prevKey = '1';
      break;
    case 'G':
      if (prevKey === '1') {
        // jump to top of page (1G)
        window.scroll(0, 0);
        prevKey = null;
      } else {
        // jump to the bottom of the page
        window.scroll(0, document.body.scrollHeight);
      }
      break;
    case 'g':
      if (prevKey === 'g') {
        // jump to top of page (gg)
        window.scroll(0, 0);
        prevKey = null;
      } else {
        prevKey = 'g';
      }
      break;
    case 'j':
      // scroll down lineHeight pixels
      window.scrollBy(0, lineHeight);
      break;
    case 'k':
      // scroll up lineHeight pixels
      window.scrollBy(0, -lineHeight);
      break;
    case '{':
      if (!elements) return;  // do nothing if we have no paragraphs

      // scroll to the previous paragraph or top of the page
      (el = getPrevElement(elements)) && el.scrollIntoView();
      break;
    case '}':
      if (!elements) return;  // do nothing if we have no paragraphs

      // scroll to the next paragraph
      (el = getNextElement(elements)) && el.scrollIntoView();
      break;
  }
});
