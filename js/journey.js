// ============================================
// INSULIGHT — MISSION JOURNAL (HYBRIX SIMPLE)
// ============================================

async function loadJourneyPosts() {
    const feed = document.getElementById("journey-feed");
  
    if (!feed) {
      console.error("No #journey-feed found");
      return;
    }
  
    try {
      const response = await fetch("/data/posts.json"); 
      // NOTE: leading "/" makes it absolute from root (more stable)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const posts = await response.json();
  
      console.log("Posts loaded:", posts);
  
      // IMPORTANT: clear feed first (prevents duplication)
      feed.innerHTML = "";
  
      posts.slice().reverse().forEach((post, index) => {
  
        const article = document.createElement("article");
        article.className = "journal-card fade-up";
  
        article.innerHTML = `
          <div class="journal-image-wrapper">
            <img 
              src="${post.image}" 
              alt="${post.title}" 
              class="journal-image"
              loading="lazy"
            >
          </div>
  
          <div class="journal-content">
            <div class="journal-meta">
              <span>${post.date}</span>
              <span>•</span>
              <span>${post.location}</span>
            </div>
  
            <h3>${post.title}</h3>
  
            <p>${post.text}</p>
  
            <a href="${post.link}" target="_blank" class="journal-link">
              Read Update →
            </a>
          </div>
        `;
  
        feed.appendChild(article);
  
        // trigger fade animation correctly
        requestAnimationFrame(() => {
          article.classList.add("visible");
        });
      });
  
    } catch (error) {
      console.error("Failed to load posts:", error);
      feed.innerHTML = `<p style="color:white;">Failed to load posts.</p>`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadJourneyPosts);