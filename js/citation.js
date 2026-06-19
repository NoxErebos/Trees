const feed = document.getElementById("citation-feed");
const searchBar = document.getElementById("citeSearch");
let items = [];
async function loaditems() {
    try {
        const response = await fetch("data/citations.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        items = await response.json();
        renderGames(items);
        setupSearch();
    } catch (error) {
        console.error(error);
        feed.innerHTML = `
            <article class="catalogue-card">
                <div class="catalogue-content">
                    Failed to load citations.
                </div>
            </article>
        `;
    }
}
function renderGames(gameList) {
  feed.innerHTML = "";
  gameList.forEach(item => {
      const article = document.createElement("article");
      article.className = "catalogue-card fade-up";
      article.id = `tree-${item.id}`;
      article.innerHTML = `
      <div class="catalogue-wrapper">
          <div class="catalogue-content">
              <div class="catalogue-info-row">
                  <div class="catalogue-meta">${item.khmer || ""}</div>
                  <a href="map.html?tree=${item.id}" class="catalogue-map-link" title="View on Campus Map" aria-label="View on Campus Map">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
                      </svg>
                  </a>
              </div>
              <div class="catalogue-name">
                  <h3>${item.common || ""}</h3>
              </div>
              <div class="catalogue-info-row">
                  <a href="${item.cite1 || "#"}" target="_blank" rel="noopener noreferrer" class="catalogue-link">Citation 1 →</a>
                  <a href="${item.cite2 || "#"}" target="_blank" rel="noopener noreferrer" class="catalogue-link">Citation 2 →</a>
                  <a href="${item.cite3 || "#"}" target="_blank" rel="noopener noreferrer" class="catalogue-link">Citation 3 →</a>
                  <span class="catalogue-id" style="color: var(--gold);">#${item.id}</span>
              </div>
          </div>
      </div>
      `;
      feed.appendChild(article);
      requestAnimationFrame(() => {article.classList.add("visible");});
  });
}

function setupSearch() {
    if (!searchBar) return;
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase().trim();
        // If search is cleared, show ALL items again
        if (query === "") {
            renderGames(items); 
            return;
        }
        // Filter instantly from the global 'items' array (no fetch needed)
        const filteredItems = items.filter(item => {
            return (
                (item.common || "").toLowerCase().includes(query) ||
                (item.khmer || "").toLowerCase().includes(query) ||
                (item.id || "").toLowerCase().includes(query)
            );
        });
        // Render results or handle the empty "no match" state safely
        if (filteredItems.length === 0) {
            console.log("ERROR: No matching data found!");
            feed.innerHTML = `
                <article class="catalogue-card">
                    <div class="catalogue-content" style="text-align: center; color: var(--gold);">
                        <h3>No trees found matching "${searchBar.value}"</h3>
                    </div>
                </article>
            `;
        } else {
            renderGames(filteredItems);
        } 
    });
}


document.addEventListener("DOMContentLoaded", loaditems);