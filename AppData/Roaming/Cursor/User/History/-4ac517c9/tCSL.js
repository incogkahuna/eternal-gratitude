/* Thank You Cindy - Shared JavaScript */

// Global variables
let psychedelicMode = false;
let easterEggBuffer = '';
let isSpeaking = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEasterEgg();
    initializeCommonFeatures();
});

// Easter Egg: Type "CINDY" to activate psychedelic mode
function initializeEasterEgg() {
    document.addEventListener('keydown', function(event) {
        // Add the pressed key to the buffer
        easterEggBuffer += event.key.toLowerCase();
        
        // Keep only the last 5 characters
        if (easterEggBuffer.length > 5) {
            easterEggBuffer = easterEggBuffer.slice(-5);
        }
        
        // Check if "cindy" has been typed
        if (easterEggBuffer === 'cindy') {
            togglePsychedelicMode();
            easterEggBuffer = ''; // Reset buffer
        }
    });
}

// Toggle psychedelic color-cycling mode
function togglePsychedelicMode() {
    psychedelicMode = !psychedelicMode;
    const body = document.body;
    
    if (psychedelicMode) {
        body.classList.add('psychedelic-mode');
        showNotification('🌈 Psychedelic mode activated! 🌈', 'success');
    } else {
        body.classList.remove('psychedelic-mode');
        showNotification('✨ Psychedelic mode deactivated ✨', 'info');
    }
}

// Initialize common features across all pages
function initializeCommonFeatures() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animations
    addLoadingAnimations();
    
    // Initialize any page-specific features
    if (typeof initializePageFeatures === 'function') {
        initializePageFeatures();
    }
}

// Add loading animations to elements
function addLoadingAnimations() {
    // Add pulse animation to buttons
    document.querySelectorAll('button, .nav-link').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 243, 255, 0.9)' : 'rgba(255, 0, 255, 0.9)'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Utility function to generate random colors
function getRandomColor() {
    const colors = ['#00f3ff', '#ff00ff', '#ffb700', '#00ff00', '#ff0080', '#8000ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Utility function to generate random gradient
function getRandomGradient() {
    const gradients = [
        'linear-gradient(45deg, #00f3ff, #ff00ff)',
        'linear-gradient(45deg, #ff00ff, #ffb700)',
        'linear-gradient(45deg, #ffb700, #00f3ff)',
        'linear-gradient(45deg, #00ff00, #ff0080)',
        'linear-gradient(45deg, #8000ff, #00f3ff)',
        'linear-gradient(45deg, #ff0080, #ffb700)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// Utility function to format large numbers
function formatNumber(num) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(1) + 'T';
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';
    }
    return num.toString();
}

// Utility function to generate random thank you messages
function generateThankYouMessage() {
    const messages = [
        'Thank you, Cindy!',
        'Thank you so much, Cindy!',
        'Cindy, thank you!',
        'Thank you, Cindy! You\'re amazing!',
        'Cindy, thank you for everything!',
        'Thank you, Cindy! You\'re the best!',
        'Cindy, thank you! You\'re incredible!',
        'Thank you, Cindy! You\'re wonderful!',
        'Cindy, thank you! You\'re fantastic!',
        'Thank you, Cindy! You\'re awesome!',
        'Cindy, thank you! You\'re brilliant!',
        'Thank you, Cindy! You\'re outstanding!',
        'Cindy, thank you! You\'re remarkable!',
        'Thank you, Cindy! You\'re extraordinary!',
        'Cindy, thank you! You\'re phenomenal!'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Utility function to add glow effect
function addGlowEffect(element) {
    element.style.textShadow = `0 0 10px ${getRandomColor()}, 0 0 20px ${getRandomColor()}, 0 0 30px ${getRandomColor()}`;
}

// Utility function to remove glow effect
function removeGlowEffect(element) {
    element.style.textShadow = '';
}

// Export functions for use in page-specific scripts
window.ThankYouCindy = {
    togglePsychedelicMode,
    showNotification,
    getRandomColor,
    getRandomGradient,
    formatNumber,
    generateThankYouMessage,
    addGlowEffect,
    removeGlowEffect,
    psychedelicMode: () => psychedelicMode
};
