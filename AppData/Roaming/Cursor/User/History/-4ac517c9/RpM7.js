/* ================================================
   ThankYouCindy.com - Shared JavaScript
   ================================================ */

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// Easter egg: Type "CINDY" to toggle color cycling mode
let keySequence = '';
const secretCode = 'CINDY';
let colorCycleMode = false;
let colorCycleInterval;

document.addEventListener('keypress', (e) => {
  keySequence += e.key.toUpperCase();
  
  // Keep only last 5 characters
  if (keySequence.length > 5) {
    keySequence = keySequence.slice(-5);
  }
  
  // Check if secret code is entered
  if (keySequence === secretCode) {
    toggleColorCycleMode();
    keySequence = ''; // Reset
  }
});

function toggleColorCycleMode() {
  colorCycleMode = !colorCycleMode;
  
  if (colorCycleMode) {
    console.log('🎨 Color Cycle Mode: ACTIVATED');
    let hue = 0;
    
    colorCycleInterval = setInterval(() => {
      hue = (hue + 1) % 360;
      document.documentElement.style.setProperty('--color-cyan', `hsl(${hue}, 100%, 50%)`);
      document.documentElement.style.setProperty('--color-magenta', `hsl(${(hue + 120) % 360}, 100%, 50%)`);
      document.documentElement.style.setProperty('--color-amber', `hsl(${(hue + 240) % 360}, 100%, 50%)`);
    }, 50);
  } else {
    console.log('🎨 Color Cycle Mode: DEACTIVATED');
    clearInterval(colorCycleInterval);
    
    // Reset to original colors
    document.documentElement.style.setProperty('--color-cyan', '#00f3ff');
    document.documentElement.style.setProperty('--color-magenta', '#ff00ff');
    document.documentElement.style.setProperty('--color-amber', '#ffb700');
  }
}

// Smooth parallax scroll effect (if needed by individual pages)
function initParallax(element, speed = 0.5) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const offset = scrolled * speed;
    element.style.transform = `translateY(${offset}px)`;
  });
}

// Utility: Random number in range
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility: Random item from array
function randomItem(array) {
  return array[random(0, array.length - 1)];
}

// Export utilities for use in page-specific scripts
window.ThankYouUtils = {
  random,
  randomItem,
  initParallax
};
