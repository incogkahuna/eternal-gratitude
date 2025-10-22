// ThankYouCindy.com - Main JavaScript

// Global state
let currentPage = window.location.pathname.split('/').pop() || 'index.html';
let gratitudeCount = 0;
let meditationSession = null;
let languageLoop = null;

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth page transitions
    addPageTransitions();
    
    // Initialize based on current page
    switch(currentPage) {
        case 'index.html':
        case '':
            initFeedPage();
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
        'Thank you, Cindy. You are loved.'
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
            
            // Random styling variations
            if (Math.random() < 0.3) {
                line.style.fontWeight = '500';
            }
            if (Math.random() < 0.2) {
                line.style.opacity = '0.7';
            }
            if (Math.random() < 0.1) {
                line.style.color = 'var(--accent-cyan)';
            }
            
            feedContainer.appendChild(line);
            
            // Stagger animation
            setTimeout(() => {
                line.style.animationDelay = `${Math.random() * 0.5}s`;
            }, i * 50);
        }
    }
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
            
            // Update display
            const digits = currentCount.toString().padStart(digitCount, '0').split('');
            const digitElements = counterDisplay.querySelectorAll('.digit');
            
            digits.forEach((digit, index) => {
                if (digitElements[index]) {
                    digitElements[index].textContent = digit;
                }
            });
            
            // Accelerate on hover
            const speed = counterDisplay.matches(':hover') ? 30 : 80;
            setTimeout(updateCounter, speed);
        }
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
        
        // Change background
        document.body.style.background = 'linear-gradient(135deg, #0a0a0b 0%, #1a2a3a 100%)';
        
        // Start session
        meditationContainer.innerHTML = '';
        showNextAffirmation();
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
        setTimeout(showNextLanguage, 4000);
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
