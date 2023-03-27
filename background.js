// utils
function getLocal(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key)
        .then(object => resolve(object[key]))
        .catch(error => reject(console.error(error)));
  });
}

function uniq(data) {
  return [
    ...new Map(
      data.map(x => [JSON.stringify(x), x])
    ).values()
  ];
}

// initializing counter badge
chrome.runtime.onInstalled.addListener(async () => {
  const indexData = await getLocal("indexData");
  chrome.action.setBadgeText({
    text: indexData?.rows?.length?.toString() || "",
  });
});

async function storeData(rows) {
  const storedRows = await getLocal("indexData");
  const mergedRows = uniq([...rows, ...(storedRows || [])]);

  chrome.storage.local.set({indexData: mergedRows});

  chrome.action.setBadgeText({text: (mergedRows.length || 0).toString()});
}

chrome.runtime.onMessage.addListener(storeData);

