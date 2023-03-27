function textContent(column) {
  return column?.textContent?.trim() || ''
}

function detailsLink(column) {
  return column.querySelector('a.full-details-link').href
}

function zipObject(keys, values) {
  return keys.reduce((acc, key, idx) => {
      acc[key] = values[idx]
      return acc
    }, {})
}

function parseRow(row) {
  const headerCols = Array.from(document.querySelectorAll('.record-list-table th')).map(c => textContent(c));
  const valueCols = Array.from(row.querySelectorAll('td')).map((v, i) => i == 0 ? detailsLink(v) : textContent(v));

  headerCols.push('url');
  valueCols.push(location.href);

  return zipObject(headerCols, valueCols);
}

function dumpRows(table) {
  if (table.children.length > 0) {
    let rows = Array.from(table.querySelectorAll('tr'))
    let array = rows.map((r) => parseRow(r));

    chrome.runtime.sendMessage(array);
  } else {
    console.log('Tabela vazia');
  }
}

let table = document.querySelector('.record-list-table tbody');
if (table) {
  const tableObserver = new MutationObserver(() => {
    dumpRows(table);
  });

  tableObserver.observe(table, {childList: true});
  dumpRows(table)
} else {
  console.log('Nenhuma tabela encontrada');
}
