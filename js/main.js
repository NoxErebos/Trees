document.addEventListener('DOMContentLoaded', () => {

  // ─── HAMBURGER MENU ───
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
  }

  // ─── ACTIVE NAV LINK ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── SCROLL ANIMATIONS ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ─── COUNTER ANIMATION ───
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    let start = 0;
    const duration = 1600;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));
});

function loadFooter() {
  const footerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="navbar-brand" style="margin-bottom: 15px;"><img src="image/logo.png" class="logo">Tree-Mendous Campus</div>
          <p>Together We document all trees present in the Jay Pritzker Academy Campus.</p>
        </div>
        <div class="footer-links">
          <h4>Navigate</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="catalogue.html">Trees</a></li>
            <li><a href="map.html">Map</a></li>
            <li><a href="about.html">About Us</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">suylising@jpa.org.kh</a></li>
            <li><a href="#">loeunreaksmey@jpa.org.kh</a></li>
            <li><a href="#">soatsangaukannika@jpa.org.kh</a></li>
            <li><a href="#">sokhasodanet@jpa.org.kh</a></li>
            <li><a href="#">seartetvannnita@jpa.org.kh</a></li>
            <li><a href="#">helgajoshua@jpa.org.kh</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Class of 2028. All rights reserved.</p>
        <div class="footer-badge">Made by Class of 2028</div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}
// Run the function when the window loads
window.onload = loadFooter;

// 1. Create the container
const topbar = document.createElement('nav');
topbar.className = 'navbar';

// 2. Add content (e.g., using innerHTML for simplicity)
topbar.innerHTML = `
<a href="index.html" class="navbar-brand">
    <img src="image/logo.png" class="logo">Tree-Mendous Campus
</a>
<ul class="nav-links">
  <li><a href="index.html">Home</a></li>
  <li><a href="catalogue.html">Trees</a></li>
  <li><a href="map.html">Map</a></li>
  <li><a href="about.html">About Us</a></li>
</ul>
<div class="hamburger"><span></span><span></span><span></span></div>
`;

// 3. Insert it into the body or a specific container
document.body.prepend(topbar);