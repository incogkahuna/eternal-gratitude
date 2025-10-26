/* ================================================
   Infinite Gratitude Feed - JavaScript
   ================================================ */

const feedContainer = document.getElementById('feed-container');
const loadingIndicator = document.getElementById('loading');

// Thank you message templates
const thankYouTemplates = [
  'Thank you, Cindy',
  'Thanks, Cindy',
  'Thank you so much, Cindy',
  'Cindy, thank you',
  'Forever grateful, Cindy',
  'Endless thanks, Cindy',
  'Thanks a million, Cindy',
  'Gratitude to you, Cindy',
  'Cindy — thank you',
  'Thank you × infinity, Cindy',
  'Thankyouthankyouthankyou, Cindy',
  'T H A N K  Y O U, Cindy',
  'thx cindy',
  '💜 Thank you, Cindy 💜',
  'Thank. You. Cindy.',
  '<<< THANK YOU CINDY >>>',
  'THANK YOU CINDY',
  'thank you cindy',
  'Thank You, Cindy ✨',
];

const colors = ['color-cyan', 'color-magenta', 'color-amber', 'color-white'];
const fontClasses = ['font-mono', 'font-sans', 'font-serif'];
const styleClasses = ['style-normal', 'style-bold', 'style-italic', 'style-heavy'];

let messageCount = 0;
let isGenerating = false;

// Generate a single thank-you message
function createThankYouElement() {
  const item = document.createElement('div');
  item.className = 'thank-you-item';
  
  const text = document.createElement('p');
  text.className = 'thank-you-text';
  
  // Pick random template
  let message = window.ThankYouUtils.randomItem(thankYouTemplates);
  
  // 10% chance of merged/morphed text
  if (Math.random() < 0.1) {
    text.classList.add('merged-text');
  } else {
    // Apply random color
    text.classList.add(window.ThankYouUtils.randomItem(colors));
  }
  
  // Apply random font and style
  text.classList.add(window.ThankYouUtils.randomItem(fontClasses));
  text.classList.add(window.ThankYouUtils.randomItem(styleClasses));
  
  text.textContent = message;
  item.appendChild(text);
  
  // Add animation delay for staggered effect
  item.style.animationDelay = `${messageCount * 0.05}s`;
  
  messageCount++;
  return item;
}

// Generate multiple messages
function generateMessages(count = 10) {
  if (isGenerating) return;
  isGenerating = true;
  
  for (let i = 0; i < count; i++) {
    const element = createThankYouElement();
    feedContainer.appendChild(element);
  }
  
  isGenerating = false;
}

// Infinite scroll detection
let lastScrollTop = 0;
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  
  // If scrolled near bottom (within 500px), generate more
  if (scrollTop + clientHeight >= scrollHeight - 500) {
    generateMessages(8);
  }
  
  lastScrollTop = scrollTop;
}

// Initialize
function init() {
  // Generate initial messages
  generateMessages(15);
  
  // Set up infinite scroll
  window.addEventListener('scroll', window.ThankYouUtils.debounce(handleScroll, 100));
  
  // Also generate more every few seconds if user isn't scrolling
  setInterval(() => {
    if (messageCount < 100) {
      generateMessages(3);
    }
  }, 3000);
}

// Debounce utility (add to shared utils if not present)
if (!window.ThankYouUtils.debounce) {
  window.ThankYouUtils.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

