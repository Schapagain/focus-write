import adjectives from "./adjectives";
import nouns from "./nouns";

export function saveToLocalStorage(obj) {
  Object.keys(obj).forEach((key) =>
    localStorage.setItem([key], JSON.stringify(obj[key]))
  );
}

export function getFromLocalStorage(key) {
  const val = localStorage.getItem(key);
  return val && JSON.parse(val);
}

export function getRandomAdjective() {
  return capitalize(adjectives[getRandomInt(adjectives.length)]);
}

export function getRandomNoun() {
  return capitalize(nouns[getRandomInt(nouns.length)]);
}

export function getRandomInt(max = 10000) {
  return Math.floor(Math.random() * max);
}

export function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function placeCaretAtEnd(el) {
  el.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}
