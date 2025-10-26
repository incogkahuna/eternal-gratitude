/* ================================================
   Gratitude Counter Wall - JavaScript
   ================================================ */

const counterDisplay = document.getElementById('counter');
const thanksPerSecondDisplay = document.getElementById('thanksPerSecond');
const thanksPerMinuteDisplay = document.getElementById('thanksPerMinute');
const thanksPerDayDisplay = document.getElementById('thanksPerDay');

// Counter state
let currentCount = 0;
let incrementRate = 7; // Thanks per second
let lastUpdateTime = Date.now();

// Format number with leading zeros
function formatCounter(num, digits = 10) {
  return String(num).padStart(digits, '0');
}

// Format large numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update counter display with rolling animation
function updateCounterDisplay(newValue) {
  const formatted = formatCounter(newValue);
  const oldFormatted = counterDisplay.textContent;
  
  // Only update digits that changed
  let html = '';
  for (let i = 0; i < formatted.length; i++) {
    if (formatted[i] !== oldFormatted[i]) {
      html += `<span class="digit-roll">${formatted[i]}</span>`;
    } else {
      html += formatted[i];
    }
  }
  
  counterDisplay.innerHTML = html;
}

// Update statistics
function updateStats() {
  const perSecond = incrementRate;
  const perMinute = incrementRate * 60;
  const perDay = incrementRate * 60 * 60 * 24;
  
  thanksPerSecondDisplay.textContent = formatNumber(perSecond);
  thanksPerMinuteDisplay.textContent = formatNumber(perMinute);
  thanksPerDayDisplay.textContent = formatNumber(perDay);
}

// Main counter animation loop
function animateCounter() {
  const now = Date.now();
  const deltaTime = (now - lastUpdateTime) / 1000; // Convert to seconds
  
  // Increment based on time passed
  const increment = Math.floor(incrementRate * deltaTime);
  
  if (increment > 0) {
    currentCount += increment;
    updateCounterDisplay(currentCount);
    lastUpdateTime = now;
  }
  
  requestAnimationFrame(animateCounter);
}

// Slowly increase the increment rate over time (exponential growth effect)
function increaseRate() {
  incrementRate = Math.min(incrementRate * 1.001, 100); // Cap at 100/sec
  
  // Randomly vary the rate slightly for organic feel
  if (Math.random() < 0.1) {
    incrementRate += window.ThankYouUtils.random(1, 3);
  }
}

// Initialize
function init() {
  // Set initial count (make it look like it's been running for a while)
  currentCount = window.ThankYouUtils.random(1234567890, 9876543210);
  updateCounterDisplay(currentCount);
  updateStats();
  
  // Start animation loop
  requestAnimationFrame(animateCounter);
  
  // Update stats every second
  setInterval(updateStats, 1000);
  
  // Gradually increase rate
  setInterval(increaseRate, 100);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

