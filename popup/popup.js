document.getElementById("download").addEventListener("click", () => {
  chrome.storage.local.get(['indexData'], (result) => {
    if(result.indexData) {
      const blob = new Blob([JSON.stringify(result.indexData)], { type: "application/json" });
      const test = document.getElementById("test");
      test.setAttribute('href', URL.createObjectURL(blob));
      test.setAttribute('download', 'test.json');
      test.click();
    }
  })
});
