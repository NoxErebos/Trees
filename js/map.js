async function loadMapMarkers() {

    const container = document.getElementById("tree-markers");
  
    try {
  
      const response = await fetch("data/catalogue.json");
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
  
      const trees = await response.json();
  
      trees.forEach(tree => {
  
        const marker = document.createElement("a");
  
        marker.className = "tree-marker";
  
        marker.href = `catalogue.html?tree=${tree.id}`;
  
        marker.textContent = tree.id;
  
        marker.style.left = `${tree.mapX}%`;
        marker.style.top = `${tree.mapY}%`;
  
        marker.title = tree.common;
  
        container.appendChild(marker);
  
      });
  
    } catch(error) {
  
      console.error(error);
  
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadMapMarkers);