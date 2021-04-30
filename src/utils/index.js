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
