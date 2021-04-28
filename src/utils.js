export function saveToLocalStorage(obj) {
  console.log("saving to local::", obj);
  Object.keys(obj).forEach((key) => localStorage.setItem([key], obj[key]));
}

export function getFromLocalStorage(key) {
  return localStorage.getItem(key) || "";
}
