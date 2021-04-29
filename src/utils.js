export function saveToLocalStorage(obj) {
  console.log("saving to local::", obj);
  Object.keys(obj).forEach((key) =>
    localStorage.setItem([key], JSON.stringify(obj[key]))
  );
}

export function getFromLocalStorage(key) {
  const val = localStorage.getItem(key);
  return val && JSON.parse(val);
}
