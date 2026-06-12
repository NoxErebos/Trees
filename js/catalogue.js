async function loadCatalogueItems() {

  const feed = document.getElementById("catalogue-feed");
  
  if (!feed) {
  console.error("No #catalogue-feed found");
  return;
  }
  
  try {
    const response = await fetch("data/catalogue.json");
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const catalogueItems = await response.json();
    
    feed.innerHTML = "";
    
    catalogueItems.slice().forEach(item => {
    
        const article = document.createElement("article");
        article.className = "catalogue-card fade-up";
    
        article.innerHTML = `
          <div class="catalogue-wrapper">
            <img src="${item.image}" alt="${item.common}" class="catalogue-image" loading="lazy">
    
            <div class="catalogue-content">
    
              <div class="catalogue-info-row">

                <div class="catalogue-meta">
                  <span>${item.nickname || 'Unknown Tree'}</span>
                  <span>•</span>
                  <span>${item.khmer || ''}</span>
                </div>

                <a href="${item.map || '#'}" class="catalogue-map-link" title="View on Campus Map" aria-label="View on Campus Map">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
                  </svg>
                </a>

              </div>

              <div class="catalogue-name">
                <h3>${item.common || ''}</h3>
                <span class="catalogue-scientific">
                    ${item.scientific || ''}
                </span>
                ${item.family ? '<span>•</span>' : ''}
                <span class="catalogue-family">
                  ${item.family || ''}
                </span>
              </div>
              <div>
                <p class="catalogue-description">
                  ${item.description || ''}
                </p>
              </div>
              <div class="catalogue-info-row">
                  <span><a href="${item.cite || '#'}" target="_blank" rel="noopener noreferrer" class="catalogue-link">Learn More →</a></span>
                  <span class="catalogue-id" style="color: var(--gold);">#${item.id || ''}</span>
              </div>
          </div>
        `;
    
        feed.appendChild(article);
    
        requestAnimationFrame(() => {
          article.classList.add("visible");
        });
    
    });
  } catch (error) {
    console.error("Failed to load catalogue items:", error);
    
    feed.innerHTML = `
      <article class="catalogue-card">
        <div class="catalogue-content">
          <h3>Unable to load catalogue</h3>
          <p class="catalogue-description">
            ${error.message}
          </p>
        </div>
      </article>
    `;
  }
}
  
document.addEventListener("DOMContentLoaded", loadCatalogueItems);
  