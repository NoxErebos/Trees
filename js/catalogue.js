const feed = document.getElementById("catalogue-feed");
let items = [];
async function loaditems() {
    try {
        const response = await fetch("data/catalogue.json");
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
                    Failed to load catalogue.
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
          <img src="${item.image}" class="catalogue-image" loading="lazy" alt="${item.common}">
          <div class="catalogue-content">
              <div class="catalogue-info-row">
                  <div class="catalogue-meta">
                      <span>${item.nickname || "Unknown Tree"}</span>
                      <span>•</span>
                      <span>${item.khmer || ""}</span>
                  </div>

                  <a href="map.html?tree=${item.id}" class="catalogue-map-link" title="View on Campus Map" aria-label="View on Campus Map">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
                      </svg>
                  </a>
              </div>
              <div class="catalogue-name">
                  <h3>${item.common || ""}</h3>
                  <span class="catalogue-scientific">${item.scientific || ""}</span>
                  ${item.genus ? "<span>•</span>" : ""}
                  <span class="catalogue-genus">${item.genus || ""}</span>
              </div>
              <p class="catalogue-description">${item.description || ""}</p>
              <div class="catalogue-info-row">
                  <a href="${item.cite || "#"}" target="_blank" rel="noopener noreferrer" class="catalogue-link">Learn More →</a>
                  <span class="catalogue-id" style="color: var(--gold);">#${item.id}</span>
              </div>
          </div>
      </div>
      `;
      feed.appendChild(article);
      requestAnimationFrame(() => {article.classList.add("visible");});
  });
  highlightSelectedTree();
}

function highlightSelectedTree() {
    const params = new URLSearchParams(window.location.search);
    const selectedTree = params.get("tree");
    if (!selectedTree) return;
    setTimeout(() => {
        const card = document.getElementById(`tree-${selectedTree}`);
        if (!card) return;
        card.scrollIntoView({behavior: "smooth", block: "center"});
        card.classList.add("selected-tree");
    }, 300);
}

function setupSearch() {
    const searchBar = document.getElementById("treeSearch");
    if (!searchBar) return;
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        const filteredItems = items.filter(item => {
            return ((item.common || "").toLowerCase().includes(query)||(item.scientific || "").toLowerCase().includes(query)||(item.khmer || "").toLowerCase().includes(query)||(item.nickname || "").toLowerCase().includes(query)||(item.id || "").toLowerCase().includes(query)
            );
        });
        renderGames(filteredItems);
    });
}

document.addEventListener("DOMContentLoaded", loaditems);