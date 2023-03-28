import { stringify } from './stringify.js';

function createCSV(rows) {
  const columns = Array.from(new Set(rows.flatMap(Object.keys)));
  return stringify(rows, {header: true, columns: columns});
}

document.getElementById("download").addEventListener("click", () => {
  chrome.storage.local.get(['indexData'], (result) => {
    if(result.indexData) {
      const blob = new Blob([createCSV(result.indexData)], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({url: url});
    }
  })
});

document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({indexData: []});
});
