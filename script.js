// ThankYouCindy.com - Main JavaScript

// Global state
let currentPage = window.location.pathname.split('/').pop() || 'index.html';
let gratitudeCount = 0;
let meditationSession = null;
let languageLoop = null;

// Mobile gesture state
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isPulling = false;
let pullDistance = 0;
let lastTouchTime = 0;
let touchVelocity = 0;

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth page transitions
    addPageTransitions();
    
    // Add mobile gesture support
    addMobileGestures();
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    // Initialize based on current page
    switch(currentPage) {
        case 'index.html':
        case '':
            initSinglePage();
            break;
        case 'counter.html':
            initCounterPage();
            break;
        case 'meditation.html':
            initMeditationPage();
            break;
        case 'languages.html':
            initLanguagesPage();
            break;
    }
});

// Page transition effects
function addPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Fade out current page
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Feed Page - Infinite Gratitude Generator
function initFeedPage() {
    const feedContainer = document.getElementById('feedContainer');
    if (!feedContainer) return;
    
    const gratitudePhrases = [
        'Thank you, Cindy.',
        'Thanks, Cindy.',
        'Much appreciated, Cindy.',
        'Grateful for you, Cindy.',
        'You are appreciated, Cindy.',
        'Thank you so much, Cindy.',
        'We appreciate you, Cindy.',
        'Gratitude to you, Cindy.',
        'Thank you for everything, Cindy.',
        'You make a difference, Cindy.',
        'Thank you, Cindy. You are valued.',
        'Cindy, thank you for being you.',
        'Endless gratitude, Cindy.',
        'Thank you, Cindy. You inspire.',
        'Cindy, your generosity matters.',
        'Thank you, Cindy. You are seen.',
        'Cindy, thank you for believing.',
        'Thank you, Cindy. You are enough.',
        'Cindy, thank you for sharing.',
        'Thank you, Cindy. You are loved.',
        // Sassy but kind phrases
        'Cindy, you\'re literally the best.',
        'Thank you, Cindy. You\'re amazing.',
        'Cindy, you\'re a legend.',
        'Thank you, Cindy. You\'re incredible.',
        'Cindy, you\'re the MVP.',
        'Thank you, Cindy. You\'re awesome.',
        'Cindy, you\'re a rockstar.',
        'Thank you, Cindy. You\'re brilliant.',
        'Cindy, you\'re a gem.',
        'Thank you, Cindy. You\'re phenomenal.',
        'Cindy, you\'re the GOAT.',
        'Thank you, Cindy. You\'re outstanding.',
        'Cindy, you\'re a legend in the making.',
        'Thank you, Cindy. You\'re extraordinary.',
        'Cindy, you\'re absolutely fantastic.',
        'Thank you, Cindy. You\'re remarkable.',
        'Cindy, you\'re a true hero.',
        'Thank you, Cindy. You\'re magnificent.',
        'Cindy, you\'re simply the best.',
        'Thank you, Cindy. You\'re wonderful.'
    ];
    
    let isGenerating = false;
    
    // Generate initial batch
    generateGratitudeBatch(20);
    
    // Infinite scroll
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && !isGenerating) {
            isGenerating = true;
            setTimeout(() => {
                generateGratitudeBatch(15);
                isGenerating = false;
            }, 500);
        }
    });
    
    function generateGratitudeBatch(count) {
        for (let i = 0; i < count; i++) {
            const line = document.createElement('div');
            line.className = 'gratitude-line';
            
            // Random phrase selection
            let phrase = gratitudePhrases[Math.floor(Math.random() * gratitudePhrases.length)];
            
            // Occasional mash-up (every 15th entry)
            if (Math.random() < 0.07) {
                const phrase1 = gratitudePhrases[Math.floor(Math.random() * gratitudePhrases.length)];
                const phrase2 = gratitudePhrases[Math.floor(Math.random() * gratitudePhrases.length)];
                phrase = `${phrase1} ${phrase2}`;
            }
            
            line.textContent = phrase;
            
            // Random font variation (1-8)
            const fontClass = `font-${Math.floor(Math.random() * 8) + 1}`;
            line.classList.add(fontClass);
            
            // Random styling variations
            if (Math.random() < 0.3) {
                line.style.opacity = '0.7';
            }
            if (Math.random() < 0.1) {
                line.style.color = 'var(--accent-cyan)';
            }
            if (Math.random() < 0.05) {
                line.style.textShadow = '0 0 10px rgba(63, 170, 196, 0.5)';
            }
            
            feedContainer.appendChild(line);
            
            // Stagger animation
            setTimeout(() => {
                line.style.animationDelay = `${Math.random() * 0.5}s`;
            }, i * 50);
        }
    }
}

// Single Page - All sections in one continuous scroll
function initSinglePage() {
    console.log('Initializing single page with all sections');
    
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        // Initialize only the sections that should auto-start
        initCounterPage();
        initFeedPage();
        
        // Add button functionality for single page
        addSinglePageButtonHandlers();
        
        console.log('Sections initialized - buttons ready');
    }, 100);
    
    // Remove page navigation for single page
    removePageNavigation();
}

// Global Gratitude - Simple language cycling
let isLanguageCycling = false;

function startGlobalGratitude() {
    console.log('startGlobalGratitude called');
    const container = document.getElementById('languagesContainer');
    const button = document.getElementById('languagesButton');
    
    console.log('Container:', container);
    console.log('Button:', button);
    
    if (!container) {
        console.error('No languagesContainer found!');
        return;
    }
    
    // Hide button
    if (button) button.style.display = 'none';
    
    // Stop if already cycling
    if (isLanguageCycling) {
        console.log('Already cycling, returning');
        return;
    }
    isLanguageCycling = true;
    console.log('Starting language cycling');
    
    const languages = [
        { lang: "English", text: "Thank you, Cindy." },
        { lang: "Spanish", text: "Gracias, Cindy." },
        { lang: "French", text: "Merci, Cindy." },
        { lang: "German", text: "Danke, Cindy." },
        { lang: "Italian", text: "Grazie, Cindy." },
        { lang: "Portuguese", text: "Obrigado, Cindy." },
        { lang: "Japanese", text: "ありがとう, Cindy." },
        { lang: "Korean", text: "감사합니다, Cindy." },
        { lang: "Chinese", text: "谢谢, Cindy." },
        { lang: "Arabic", text: "شكراً, Cindy." },
        { lang: "Russian", text: "Спасибо, Cindy." },
        { lang: "Hindi", text: "धन्यवाद, Cindy." }
    ];
    
    let index = 0;
    
    function showLanguage() {
        container.innerHTML = `
            <div class="language-display">
                <h3 class="language-name">${languages[index].lang}</h3>
                <p class="language-text">${languages[index].text}</p>
            </div>
        `;
        
        // Text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(languages[index].text);
            utterance.lang = getLanguageCode(languages[index].lang);
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
        
        index = (index + 1) % languages.length;
        setTimeout(showLanguage, 1333);
    }
    
    showLanguage();
}

// Zen Gratitude - Simple meditation
let isMeditating = false;

function startZenGratitude() {
    console.log('startZenGratitude called');
    const container = document.getElementById('meditationContainer');
    const button = document.getElementById('meditationButton');
    
    console.log('Container:', container);
    console.log('Button:', button);
    
    if (!container) {
        console.error('No meditationContainer found!');
        return;
    }
    
    // Hide button
    if (button) button.style.display = 'none';
    
    // Stop if already meditating
    if (isMeditating) {
        console.log('Already meditating, returning');
        return;
    }
    isMeditating = true;
    console.log('Starting meditation');
    
    const affirmations = [
        "Breathe in gratitude...",
        "Thank you, Cindy, for your kindness.",
        "Breathe out appreciation...",
        "Thank you, Cindy, for your support.",
        "Breathe in peace...",
        "Thank you, Cindy, for being you.",
        "Breathe out love...",
        "Thank you, Cindy, for everything."
    ];
    
    let index = 0;
    
    function showAffirmation() {
        container.innerHTML = `
            <div class="meditation-content">
                <div class="breathing-circle"></div>
                <p class="meditation-text">${affirmations[index]}</p>
            </div>
        `;
        
        index = (index + 1) % affirmations.length;
        setTimeout(showAffirmation, 3000);
    }
    
    showAffirmation();
}

function addSinglePageButtonHandlers() {
    console.log('Setting up button handlers...');
    
    // Global Gratitude button
    const languagesButton = document.getElementById('languagesButton');
    console.log('Languages button found:', languagesButton);
    if (languagesButton) {
        languagesButton.addEventListener('click', function(e) {
            console.log('Languages button clicked!');
            e.preventDefault();
            startGlobalGratitude();
        });
    }
    
    // Zen Gratitude button
    const meditationButton = document.getElementById('meditationButton');
    console.log('Meditation button found:', meditationButton);
    if (meditationButton) {
        meditationButton.addEventListener('click', function(e) {
            console.log('Meditation button clicked!');
            e.preventDefault();
            startZenGratitude();
        });
    }
    
    console.log('Button handlers set up complete');
}



function removePageNavigation() {
    // Remove touch navigation for single page
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    
    // Remove keyboard navigation for single page
    document.removeEventListener('keydown', handleKeyDown);
}

// Counter Page - Split-flap Counter
function initCounterPage() {
    const counterDisplay = document.getElementById('counterDisplay');
    if (!counterDisplay) return;
    
    let currentCount = 0;
    const targetCount = 999999; // High number for demonstration
    
    // Create digit elements
    function createDigitElement() {
        const digit = document.createElement('span');
        digit.className = 'digit';
        digit.textContent = '0';
        return digit;
    }
    
    // Initialize display with multiple digits
    const digitCount = 6;
    for (let i = 0; i < digitCount; i++) {
        counterDisplay.appendChild(createDigitElement());
    }
    
    // Counter animation
    function updateCounter() {
        if (currentCount < targetCount) {
            currentCount += Math.floor(Math.random() * 3) + 1;
            
            // Update display with flip animation
            const digits = currentCount.toString().padStart(digitCount, '0').split('');
            const digitElements = counterDisplay.querySelectorAll('.digit');
            
            digits.forEach((digit, index) => {
                if (digitElements[index] && digitElements[index].textContent !== digit) {
                    digitElements[index].classList.add('changing');
                    setTimeout(() => {
                        digitElements[index].textContent = digit;
                        digitElements[index].classList.remove('changing');
                    }, 300);
                }
            });
            
            // Accelerate on touch (mobile)
            const speed = counterDisplay.matches(':active') ? 20 : 80;
            setTimeout(updateCounter, speed);
        }
    }
    
    // Add mobile touch acceleration
    counterDisplay.addEventListener('touchstart', function() {
        triggerHapticFeedback();
    }, { passive: true });
    
    // Add shake gesture to reset counter
    let lastShakeTime = 0;
    window.addEventListener('devicemotion', function(e) {
        const acceleration = e.accelerationIncludingGravity;
        const shake = Math.sqrt(acceleration.x * acceleration.x + acceleration.y * acceleration.y + acceleration.z * acceleration.z);
        
        if (shake > 15 && Date.now() - lastShakeTime > 1000) {
            lastShakeTime = Date.now();
            resetCounter();
            triggerHapticFeedback();
        }
    }, true);
    
    function resetCounter() {
        currentCount = 0;
        const digitElements = counterDisplay.querySelectorAll('.digit');
        digitElements.forEach(digit => {
            digit.textContent = '0';
            digit.classList.add('changing');
            setTimeout(() => digit.classList.remove('changing'), 300);
        });
    }
    
    // Start counter
    setTimeout(updateCounter, 1000);
}

// Meditation Page - Zen Gratitude Simulator
function initMeditationPage() {
    const meditationContainer = document.getElementById('meditationContainer');
    if (!meditationContainer) return;
    
    const affirmations = [
        'Inhale.',
        'Exhale.',
        'You are appreciated.',
        'Your generosity powers creation.',
        'The computers you share become instruments of imagination.',
        'Somewhere, a project begins because of you.',
        'Thank you, Cindy.',
        'You make real things possible.',
        'You are seen.',
        'You are enough.'
    ];
    
    let currentStep = 0;
    let isSessionActive = false;
    
    // Show intro
    showIntro();
    
    function showIntro() {
        meditationContainer.innerHTML = `
            <div class="meditation-intro">
                Hello, Cindy.<br>
                Let's take a moment to breathe.
            </div>
            <button class="begin-button" onclick="startMeditationSession()">BEGIN SESSION</button>
        `;
    }
    
    function startMeditationSession() {
        isSessionActive = true;
        currentStep = 0;
        
        // Change background with smooth transition
        document.body.style.transition = 'background 2s ease-in-out';
        document.body.style.background = 'linear-gradient(135deg, #0a0a0b 0%, #1a2a3a 100%)';
        
        // Start session
        meditationContainer.innerHTML = '';
        showNextAffirmation();
        
        // Add mobile touch to continue
        meditationContainer.addEventListener('touchstart', function() {
            if (isSessionActive) {
                triggerHapticFeedback();
            }
        }, { passive: true });
        
        // Add swipe down to exit
        let startY = 0;
        meditationContainer.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        meditationContainer.addEventListener('touchend', function(e) {
            const endY = e.changedTouches[0].clientY;
            const deltaY = endY - startY;
            
            if (deltaY > 100) {
                // Swipe down to exit
                exitMeditation();
            }
        }, { passive: true });
    }
    
    function exitMeditation() {
        isSessionActive = false;
        showIntro();
        document.body.style.background = 'var(--bg-primary)';
    }
    
    function showNextAffirmation() {
        if (currentStep >= affirmations.length) {
            showFinalMessage();
            return;
        }
        
        const affirmation = affirmations[currentStep];
        const affirmationDiv = document.createElement('div');
        affirmationDiv.className = 'meditation-text';
        affirmationDiv.textContent = affirmation;
        
        meditationContainer.appendChild(affirmationDiv);
        
        currentStep++;
        
        // Show next affirmation after delay
        setTimeout(showNextAffirmation, 3000);
    }
    
    function showFinalMessage() {
        meditationContainer.innerHTML = `
            <div class="meditation-text breathing" style="font-size: 3rem; color: var(--accent-cyan);">
                THANK YOU, CINDY.
            </div>
            <button class="control-button" onclick="location.reload()">Replay Session</button>
        `;
    }
    
    // Make functions globally accessible
    window.startMeditationSession = startMeditationSession;
}

// Languages Page - Multilingual Gratitude
function initLanguagesPage() {
    const languagesContainer = document.getElementById('languagesContainer');
    if (!languagesContainer) return;
    
    const gratitudeLanguages = [
        { lang: "English", text: "Thank you, Cindy." },
        { lang: "Spanish", text: "Gracias, Cindy." },
        { lang: "French", text: "Merci, Cindy." },
        { lang: "German", text: "Danke, Cindy." },
        { lang: "Japanese", text: "ありがとう, シンディ." },
        { lang: "Korean", text: "감사합니다, 신디." },
        { lang: "Italian", text: "Grazie, Cindy." },
        { lang: "Portuguese", text: "Obrigado, Cindy." },
        { lang: "Russian", text: "Спасибо, Синди." },
        { lang: "Chinese", text: "谢谢你, 辛迪." },
        { lang: "Arabic", text: "شكراً لك، سيندي." },
        { lang: "Hindi", text: "धन्यवाद, सिंडी." }
    ];
    
    let currentLanguageIndex = 0;
    let isLooping = false;
    
    // Show initial message
    showVolumeNotice();
    
    function showVolumeNotice() {
        languagesContainer.innerHTML = `
            <div class="volume-notice">Turn up your volume.</div>
            <button class="begin-button" onclick="startLanguageLoop()">BEGIN GRATITUDE</button>
        `;
    }
    
    function startLanguageLoop() {
        isLooping = true;
        showNextLanguage();
        
        // Add mobile swipe gestures for manual language control
        let startX = 0;
        languagesContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        languagesContainer.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;
            
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe right - previous language
                    navigateToPreviousLanguage();
                } else {
                    // Swipe left - next language
                    navigateToNextLanguage();
                }
            }
        }, { passive: true });
    }
    
    function navigateToPreviousLanguage() {
        currentLanguageIndex = currentLanguageIndex > 0 ? currentLanguageIndex - 1 : gratitudeLanguages.length - 1;
        showCurrentLanguage();
        triggerHapticFeedback();
    }
    
    function navigateToNextLanguage() {
        currentLanguageIndex = (currentLanguageIndex + 1) % gratitudeLanguages.length;
        showCurrentLanguage();
        triggerHapticFeedback();
    }
    
    function showCurrentLanguage() {
        const language = gratitudeLanguages[currentLanguageIndex];
        
        languagesContainer.innerHTML = `
            <div class="language-label">${language.lang}</div>
            <div class="language-text">${language.text}</div>
            <button class="control-button" onclick="stopLanguageLoop()">Stop</button>
        `;
        
        // Text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(language.text);
            utterance.lang = getLanguageCode(language.lang);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
        }
    }
    
    function showNextLanguage() {
        if (!isLooping) return;
        
        const language = gratitudeLanguages[currentLanguageIndex];
        
        languagesContainer.innerHTML = `
            <div class="language-label">${language.lang}</div>
            <div class="language-text">${language.text}</div>
            <button class="control-button" onclick="stopLanguageLoop()">Stop</button>
        `;
        
        // Text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(language.text);
            utterance.lang = getLanguageCode(language.lang);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
        }
        
        currentLanguageIndex = (currentLanguageIndex + 1) % gratitudeLanguages.length;
        
        // Next language after delay
        setTimeout(showNextLanguage, 1333);
    }
    
    function stopLanguageLoop() {
        isLooping = false;
        speechSynthesis.cancel();
        showVolumeNotice();
    }
    
    function getLanguageCode(lang) {
        const codes = {
            'English': 'en-US',
            'Spanish': 'es-ES',
            'French': 'fr-FR',
            'German': 'de-DE',
            'Japanese': 'ja-JP',
            'Korean': 'ko-KR',
            'Italian': 'it-IT',
            'Portuguese': 'pt-PT',
            'Russian': 'ru-RU',
            'Chinese': 'zh-CN',
            'Arabic': 'ar-SA',
            'Hindi': 'hi-IN'
        };
        return codes[lang] || 'en-US';
    }
    
    // Make functions globally accessible
    window.startLanguageLoop = startLanguageLoop;
    window.stopLanguageLoop = stopLanguageLoop;
}

// Mobile gesture support
function addMobileGestures() {
    // Swipe gesture detection
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Pull-to-refresh for feed page
    if (currentPage === 'index.html' || currentPage === '') {
        addPullToRefresh();
    }
    
    // Add haptic feedback simulation
    addHapticFeedback();
}

function addKeyboardNavigation() {
    // Add keyboard event listeners for desktop navigation
    document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateToNextPage();
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateToPreviousPage();
    }
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    lastTouchTime = Date.now();
    touchVelocity = 0;
}

function handleTouchMove(e) {
    if (!touchStartX || !touchStartY) return;
    
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    
    // Calculate velocity for momentum-based scrolling
    const currentTime = Date.now();
    const timeDelta = currentTime - lastTouchTime;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (timeDelta > 0) {
        touchVelocity = Math.abs(deltaY) / timeDelta;
    }
    
    // Vertical scroll detected with Instagram-like sensitivity and momentum
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 60) {
        // Add momentum-based threshold (faster swipes = lower threshold)
        const threshold = touchVelocity > 2 ? 40 : 80;
        
        if (Math.abs(deltaY) > threshold) {
            // Add momentum and smooth transition
            if (deltaY > 0) {
                // Scroll down - go to previous page with smooth transition
                smoothNavigateToPreviousPage();
            } else {
                // Scroll up - go to next page with smooth transition
                smoothNavigateToNextPage();
            }
        }
    }
}

function handleTouchEnd(e) {
    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
}

function navigateToPreviousPage() {
    const pages = ['languages.html', 'counter.html', 'meditation.html', 'index.html'];
    const currentIndex = pages.indexOf(currentPage);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    window.location.href = pages[previousIndex];
}

function navigateToNextPage() {
    const pages = ['languages.html', 'counter.html', 'meditation.html', 'index.html'];
    const currentIndex = pages.indexOf(currentPage);
    const nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    window.location.href = pages[nextIndex];
}

function smoothNavigateToPreviousPage() {
    // Add Instagram-like smooth transition
    const pages = ['languages.html', 'counter.html', 'meditation.html', 'index.html'];
    const currentIndex = pages.indexOf(currentPage);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    
    // Add smooth fade transition
    document.body.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.href = pages[previousIndex];
    }, 150);
}

function smoothNavigateToNextPage() {
    // Add Instagram-like smooth transition
    const pages = ['languages.html', 'counter.html', 'meditation.html', 'index.html'];
    const currentIndex = pages.indexOf(currentPage);
    const nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    
    // Add smooth fade transition
    document.body.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.href = pages[nextIndex];
    }, 150);
}

function addPullToRefresh() {
    const feedContainer = document.getElementById('feedContainer');
    if (!feedContainer) return;
    
    let startY = 0;
    let currentY = 0;
    let isPulling = false;
    
    feedContainer.addEventListener('touchstart', function(e) {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    }, { passive: true });
    
    feedContainer.addEventListener('touchmove', function(e) {
        if (isPulling && window.scrollY === 0) {
            currentY = e.touches[0].clientY;
            const pullDistance = currentY - startY;
            
            if (pullDistance > 0) {
                // Show pull-to-refresh indicator
                showPullToRefreshIndicator(pullDistance);
            }
        }
    }, { passive: true });
    
    feedContainer.addEventListener('touchend', function() {
        if (isPulling && currentY - startY > 100) {
            // Trigger refresh
            refreshFeed();
        }
        hidePullToRefreshIndicator();
        isPulling = false;
    }, { passive: true });
}

function showPullToRefreshIndicator(distance) {
    let indicator = document.querySelector('.pull-to-refresh');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'pull-to-refresh';
        indicator.textContent = 'Pull to refresh gratitude';
        document.body.appendChild(indicator);
    }
    
    if (distance > 100) {
        indicator.classList.add('active');
        indicator.textContent = 'Release to refresh';
    } else {
        indicator.textContent = 'Pull to refresh gratitude';
    }
}

function hidePullToRefreshIndicator() {
    const indicator = document.querySelector('.pull-to-refresh');
    if (indicator) {
        indicator.classList.remove('active');
        setTimeout(() => indicator.remove(), 300);
    }
}

function refreshFeed() {
    const feedContainer = document.getElementById('feedContainer');
    if (feedContainer) {
        // Clear existing content
        feedContainer.innerHTML = '';
        // Generate new batch
        generateGratitudeBatch(20);
        // Haptic feedback
        triggerHapticFeedback();
    }
}

function addHapticFeedback() {
    // Simulate haptic feedback with visual feedback
    document.addEventListener('touchstart', function(e) {
        if (e.target.matches('.gratitude-line, .nav-link, .begin-button, .control-button')) {
            triggerHapticFeedback();
        }
    }, { passive: true });
}

function triggerHapticFeedback() {
    // Visual haptic feedback simulation
    document.body.style.transform = 'scale(0.99)';
    setTimeout(() => {
        document.body.style.transform = 'scale(1)';
    }, 100);
}

// Utility functions
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax on pages that need it
if (currentPage === 'index.html' || currentPage === '') {
    addParallaxEffect();
}
