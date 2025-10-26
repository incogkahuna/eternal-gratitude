/* Feed Page JavaScript */

let thankYouCount = 0;
let isLoading = false;
let observer;

// Initialize feed when page loads
function initializePageFeatures() {
    initializeFeed();
    setupInfiniteScroll();
}

// Initialize the thank you feed
function initializeFeed() {
    const feedContainer = document.getElementById('thankYouFeed');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!feedContainer) return;
    
    // Generate initial thank you messages
    generateInitialMessages();
    
    // Set up infinite scroll
    setupInfiniteScroll();
}

// Generate initial thank you messages
function generateInitialMessages() {
    const feedContainer = document.getElementById('thankYouFeed');
    if (!feedContainer) return;
    
    // Generate 20 initial messages
    for (let i = 0; i < 20; i++) {
        addThankYouMessage();
    }
}

// Add a new thank you message to the feed
function addThankYouMessage() {
    const feedContainer = document.getElementById('thankYouFeed');
    if (!feedContainer) return;
    
    thankYouCount++;
    
    const message = window.ThankYouCindy.generateThankYouMessage();
    const timestamp = new Date().toISOString();
    const id = `TY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create thank you item element
    const item = document.createElement('div');
    item.className = 'thank-you-item';
    
    // Randomly add rainbow effect (10% chance)
    if (Math.random() < 0.1) {
        item.classList.add('rainbow');
    }
    
    item.innerHTML = `
        <div class="thank-you-text">${message}</div>
        <div class="thank-you-meta">
            <span class="thank-you-timestamp">${formatTimestamp(timestamp)}</span>
            <span class="thank-you-id">${id}</span>
        </div>
    `;
    
    // Add entrance animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Insert at the beginning of the feed
    feedContainer.insertBefore(item, feedContainer.firstChild);
    
    // Animate in
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 50);
    
    // Add glow effect if in psychedelic mode
    if (window.ThankYouCindy.psychedelicMode()) {
        setTimeout(() => {
            window.ThankYouCindy.addGlowEffect(item.querySelector('.thank-you-text'));
        }, 100);
    }
}

// Format timestamp for display
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Set up infinite scroll
function setupInfiniteScroll() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (!loadingIndicator) return;
    
    // Create intersection observer
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading) {
                loadMoreMessages();
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(loadingIndicator);
}

// Load more messages
function loadMoreMessages() {
    if (isLoading) return;
    
    isLoading = true;
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (loadingIndicator) {
        loadingIndicator.classList.add('visible');
    }
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate 10 more messages
        for (let i = 0; i < 10; i++) {
            addThankYouMessage();
        }
        
        isLoading = false;
        
        if (loadingIndicator) {
            loadingIndicator.classList.remove('visible');
        }
    }, 1000);
}

// Clean up observer when page unloads
window.addEventListener('beforeunload', () => {
    if (observer) {
        observer.disconnect();
    }
});
