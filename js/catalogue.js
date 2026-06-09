async function loadCatalogueItems() {
    const feed = document.getElementById("catalogue-feed");
  
    if (!feed) {
      console.error("No #catalogue-feed found");
      return;
    }
  
    try {
      const response = await fetch("/data/catalogue.json"); 
      // NOTE: leading "/" makes it absolute from root (more stable)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const catalogueItem = await response.json();
  
      console.log("Catalogue items loaded:", catalogueItem);
  
      // IMPORTANT: clear feed first (prevents duplication)
      feed.innerHTML = "";
  
      catalogueItem.slice().reverse().forEach((catalogueItem, index) => {
  
        const article = document.createElement("article");
        article.className = "catalogue-card fade-up";
  
        article.innerHTML = `
          <div class="catalogue-wrapper">
            <img src="${catalogueItem.image}" alt="" class="catalogue-image" loading="lazy">
    
            <div class="catalogue-content">
              <div class="catalogue-meta">
                <span>${catalogueItem.common}</span>
                <span>•</span>
                <span>#${catalogueItem.id}</span>
              </div>
              <div class="catalogue-name">
                <p>${catalogueItem.khmer}</p>
                <p>${catalogueItem.scientific}</p>
              </div>
              <p>${catalogueItem.text}</p>
    
              <a href="${catalogueItem.link}" target="_blank" class="catalogue-link">
                Read Update →
              </a>
            </div>
          </div>
        `;
  
        feed.appendChild(article);
  
        // trigger fade animation correctly
        requestAnimationFrame(() => {
          article.classList.add("visible");
        });
      });
  
    } catch (error) {
      console.error("Failed to load catalogue items:", error);
      feed.innerHTML = `<p style="color:white;">Failed to load catalogue items.</p>`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadCatalogueItems);