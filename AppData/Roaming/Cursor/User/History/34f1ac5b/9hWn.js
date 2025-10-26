/* Counter Page JavaScript */

let counterValue = 0;
let perSecond = 0;
let perMinute = 0;
let perHour = 0;
let counterInterval;
let statsInterval;

// Initialize counter when page loads
function initializePageFeatures() {
    initializeCounter();
    startCounter();
    startStats();
}

// Initialize the counter
function initializeCounter() {
    const counterElement = document.getElementById('gratitudeCounter');
    if (!counterElement) return;
    
    // Start with a random billion+ number to look like it's been running forever
    counterValue = Math.floor(Math.random() * 1000000000) + 1000000000;
    updateCounterDisplay();
}

// Start the counter animation
function startCounter() {
    counterInterval = setInterval(() => {
        // Increment counter with random amounts
        const increment = Math.floor(Math.random() * 5) + 1;
        counterValue += increment;
        
        // Update per-second rate
        perSecond = increment;
        
        updateCounterDisplay();
        animateCounter();
    }, 1000);
}

// Start stats calculation
function startStats() {
    statsInterval = setInterval(() => {
        updateStats();
    }, 1000);
}

// Update counter display
function updateCounterDisplay() {
    const counterElement = document.getElementById('gratitudeCounter');
    if (!counterElement) return;
    
    counterElement.textContent = window.ThankYouCindy.formatNumber(counterValue);
}

// Animate counter when it updates
function animateCounter() {
    const counterElement = document.getElementById('gratitudeCounter');
    if (!counterElement) return;
    
    counterElement.classList.add('animating');
    
    setTimeout(() => {
        counterElement.classList.remove('animating');
    }, 500);
}

// Update statistics
function updateStats() {
    const perSecondElement = document.getElementById('perSecond');
    const perMinuteElement = document.getElementById('perMinute');
    const perHourElement = document.getElementById('perHour');
    
    if (perSecondElement) {
        perSecondElement.textContent = perSecond;
    }
    
    if (perMinuteElement) {
        perMinute = perSecond * 60;
        perMinuteElement.textContent = window.ThankYouCindy.formatNumber(perMinute);
    }
    
    if (perHourElement) {
        perHour = perSecond * 3600;
        perHourElement.textContent = window.ThankYouCindy.formatNumber(perHour);
    }
}

// Add glow effect to counter in psychedelic mode
function addPsychedelicEffects() {
    const counterElement = document.getElementById('gratitudeCounter');
    if (!counterElement) return;
    
    if (window.ThankYouCindy.psychedelicMode()) {
        window.ThankYouCindy.addGlowEffect(counterElement);
    } else {
        window.ThankYouCindy.removeGlowEffect(counterElement);
    }
}

// Listen for psychedelic mode changes
document.addEventListener('DOMContentLoaded', function() {
    // Check for psychedelic mode changes every second
    setInterval(() => {
        addPsychedelicEffects();
    }, 1000);
});

// Clean up intervals when page unloads
window.addEventListener('beforeunload', () => {
    if (counterInterval) {
        clearInterval(counterInterval);
    }
    if (statsInterval) {
        clearInterval(statsInterval);
    }
});
