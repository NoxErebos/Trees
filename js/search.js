const response = await fetch("data/catalogue.json");
const items = await response.json();
const marker = document.createElement("a");
const searchInput = document.getElementById('treeSearch');
const resultsContainer = document.getElementById('searchResults');

function matchItem(item, query) {
  const lowerQuery = query.toLowerCase();
  return (marker.href = `catalogue.html?tree=${tree.id}`);
}

function renderResults(items) {
  if (!resultsContainer) return;
  if (!items.length) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  resultsContainer.innerHTML = items
    .map(item => `<div class="result-item"><strong>${item.name}</strong> <span>(${item.category})</span></div>`)
    .join('');
}

function search(query) {
  if (!query) {
    renderResults(jsonData);
    return;
  }

  const filtered = jsonData.filter(item => matchesItem(item, query));
  renderResults(filtered);
}

if (searchInput) {
  searchInput.addEventListener('input', event => {
    const query = event.target.value.trim();
    search(query);
  });
}

// initialize with all data on page load
search('');
