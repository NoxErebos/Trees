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
    const params = new URLSearchParams(window.location.search);

    const selectedTree = params.get("tree");

    if (selectedTree) {

    setTimeout(() => {

        const card = document.getElementById(
        `tree-${selectedTree}`
        );

        if (card) {

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        card.classList.add("selected-tree");

        }

    }, 300);

    }
  }
  
  document.addEventListener("DOMContentLoaded", loadMapMarkers);