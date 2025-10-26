/* Languages Page JavaScript */

let isSpeaking = false;
let currentLanguageIndex = 0;
let speechSynthesis;
let speechUtterance;
let languageInterval;

// Languages data
const languages = [
    { name: 'English', text: 'Thank you, Cindy!', code: 'en-US' },
    { name: 'Spanish', text: '¡Gracias, Cindy!', code: 'es-ES' },
    { name: 'French', text: 'Merci, Cindy!', code: 'fr-FR' },
    { name: 'German', text: 'Danke, Cindy!', code: 'de-DE' },
    { name: 'Italian', text: 'Grazie, Cindy!', code: 'it-IT' },
    { name: 'Portuguese', text: 'Obrigado, Cindy!', code: 'pt-PT' },
    { name: 'Russian', text: 'Спасибо, Синди!', code: 'ru-RU' },
    { name: 'Japanese', text: 'ありがとう、シンディ！', code: 'ja-JP' },
    { name: 'Korean', text: '고마워, 신디!', code: 'ko-KR' },
    { name: 'Chinese', text: '谢谢你，辛迪！', code: 'zh-CN' },
    { name: 'Arabic', text: 'شكراً لك، سيندي!', code: 'ar-SA' },
    { name: 'Hindi', text: 'धन्यवाद, सिंडी!', code: 'hi-IN' },
    { name: 'Dutch', text: 'Dank je, Cindy!', code: 'nl-NL' },
    { name: 'Swedish', text: 'Tack, Cindy!', code: 'sv-SE' },
    { name: 'Norwegian', text: 'Takk, Cindy!', code: 'no-NO' },
    { name: 'Danish', text: 'Tak, Cindy!', code: 'da-DK' },
    { name: 'Finnish', text: 'Kiitos, Cindy!', code: 'fi-FI' },
    { name: 'Polish', text: 'Dziękuję, Cindy!', code: 'pl-PL' },
    { name: 'Czech', text: 'Děkuji, Cindy!', code: 'cs-CZ' },
    { name: 'Hungarian', text: 'Köszönöm, Cindy!', code: 'hu-HU' },
    { name: 'Greek', text: 'Ευχαριστώ, Σίντι!', code: 'el-GR' },
    { name: 'Turkish', text: 'Teşekkürler, Cindy!', code: 'tr-TR' },
    { name: 'Hebrew', text: 'תודה, סינדי!', code: 'he-IL' },
    { name: 'Thai', text: 'ขอบคุณ, ซินดี้!', code: 'th-TH' },
    { name: 'Vietnamese', text: 'Cảm ơn, Cindy!', code: 'vi-VN' },
    { name: 'Indonesian', text: 'Terima kasih, Cindy!', code: 'id-ID' },
    { name: 'Malay', text: 'Terima kasih, Cindy!', code: 'ms-MY' },
    { name: 'Filipino', text: 'Salamat, Cindy!', code: 'tl-PH' },
    { name: 'Swahili', text: 'Asante, Cindy!', code: 'sw-KE' },
    { name: 'Zulu', text: 'Ngiyabonga, Cindy!', code: 'zu-ZA' },
    { name: 'Afrikaans', text: 'Dankie, Cindy!', code: 'af-ZA' },
    { name: 'Welsh', text: 'Diolch, Cindy!', code: 'cy-GB' },
    { name: 'Irish', text: 'Go raibh maith agat, Cindy!', code: 'ga-IE' },
    { name: 'Scottish Gaelic', text: 'Tapadh leat, Cindy!', code: 'gd-GB' },
    { name: 'Icelandic', text: 'Takk, Cindy!', code: 'is-IS' },
    { name: 'Estonian', text: 'Tänan, Cindy!', code: 'et-EE' },
    { name: 'Latvian', text: 'Paldies, Cindy!', code: 'lv-LV' },
    { name: 'Lithuanian', text: 'Ačiū, Cindy!', code: 'lt-LT' },
    { name: 'Slovak', text: 'Ďakujem, Cindy!', code: 'sk-SK' },
    { name: 'Slovenian', text: 'Hvala, Cindy!', code: 'sl-SI' },
    { name: 'Croatian', text: 'Hvala, Cindy!', code: 'hr-HR' },
    { name: 'Serbian', text: 'Хвала, Синди!', code: 'sr-RS' },
    { name: 'Bulgarian', text: 'Благодаря, Синди!', code: 'bg-BG' },
    { name: 'Romanian', text: 'Mulțumesc, Cindy!', code: 'ro-RO' },
    { name: 'Ukrainian', text: 'Дякую, Синді!', code: 'uk-UA' },
    { name: 'Belarusian', text: 'Дзякуй, Сіндзі!', code: 'be-BY' },
    { name: 'Macedonian', text: 'Благодарам, Синди!', code: 'mk-MK' },
    { name: 'Albanian', text: 'Faleminderit, Cindy!', code: 'sq-AL' },
    { name: 'Maltese', text: 'Grazzi, Cindy!', code: 'mt-MT' },
    { name: 'Luxembourgish', text: 'Merci, Cindy!', code: 'lb-LU' },
    { name: 'Basque', text: 'Eskerrik asko, Cindy!', code: 'eu-ES' },
    { name: 'Catalan', text: 'Gràcies, Cindy!', code: 'ca-ES' },
    { name: 'Galician', text: 'Grazas, Cindy!', code: 'gl-ES' }
];

// Initialize languages page when page loads
function initializePageFeatures() {
    console.log('Initializing languages page...');
    initializeLanguages();
    setupEventListeners();
    checkSpeechSupport();
    
    // Wait for voices to load
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = function() {
            console.log('Voices loaded:', speechSynthesis.getVoices().length);
        };
    }
    
    // Fallback: Add onclick attributes directly to buttons
    setTimeout(() => {
        const startButton = document.getElementById('startSpeaking');
        const stopButton = document.getElementById('stopSpeaking');
        
        if (startButton && !startButton.onclick) {
            startButton.onclick = function() {
                console.log('Start button clicked (fallback method)');
                startSpeaking();
            };
        }
        
        if (stopButton && !stopButton.onclick) {
            stopButton.onclick = function() {
                console.log('Stop button clicked (fallback method)');
                stopSpeaking();
            };
        }
    }, 100);
}

// Initialize the languages interface
function initializeLanguages() {
    const languageGrid = document.getElementById('languageGrid');
    if (!languageGrid) return;
    
    // Populate language grid
    languages.forEach((language, index) => {
        const languageItem = document.createElement('div');
        languageItem.className = 'language-item';
        languageItem.innerHTML = `
            <div class="language-name">${language.name}</div>
            <div class="language-text">${language.text}</div>
            <div class="language-code">${language.code}</div>
        `;
        
        languageItem.addEventListener('click', () => {
            speakLanguage(language, index);
        });
        
        languageGrid.appendChild(languageItem);
    });
}

// Set up event listeners
function setupEventListeners() {
    const startButton = document.getElementById('startSpeaking');
    const stopButton = document.getElementById('stopSpeaking');
    
    console.log('Setting up event listeners...');
    console.log('Start button found:', !!startButton);
    console.log('Stop button found:', !!stopButton);
    
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            console.log('Start button clicked!');
            e.preventDefault();
            startSpeaking();
        });
    } else {
        console.error('Start button not found!');
    }
    
    if (stopButton) {
        stopButton.addEventListener('click', function(e) {
            console.log('Stop button clicked!');
            e.preventDefault();
            stopSpeaking();
        });
    } else {
        console.error('Stop button not found!');
    }
}

// Check speech synthesis support
function checkSpeechSupport() {
    if ('speechSynthesis' in window) {
        updateVoiceStatus('Voice ready');
    } else {
        updateVoiceStatus('Speech synthesis not supported', 'error');
    }
}

// Start speaking all languages
function startSpeaking() {
    if (isSpeaking) return;
    
    console.log('Starting multilingual speaking...');
    
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
        console.error('Speech synthesis not supported');
        updateVoiceStatus('Speech synthesis not supported', 'error');
        return;
    }
    
    isSpeaking = true;
    currentLanguageIndex = 0;
    
    updateVoiceStatus('Speaking...', 'speaking');
    updateLanguageInfo('Starting multilingual gratitude...');
    
    // Start speaking languages
    speakNextLanguage();
    
    // Update buttons
    const startButton = document.getElementById('startSpeaking');
    const stopButton = document.getElementById('stopSpeaking');
    
    if (startButton) startButton.disabled = true;
    if (stopButton) stopButton.disabled = false;
}

// Stop speaking
function stopSpeaking() {
    if (!isSpeaking) return;
    
    isSpeaking = false;
    
    if (speechSynthesis) {
        speechSynthesis.cancel();
    }
    
    if (languageInterval) {
        clearInterval(languageInterval);
    }
    
    updateVoiceStatus('Stopped');
    updateLanguageInfo('Ready to speak');
    
    // Update buttons
    const startButton = document.getElementById('startSpeaking');
    const stopButton = document.getElementById('stopSpeaking');
    
    if (startButton) startButton.disabled = false;
    if (stopButton) stopButton.disabled = true;
    
    // Remove speaking class from all items
    document.querySelectorAll('.language-item').forEach(item => {
        item.classList.remove('speaking');
    });
}

// Speak next language
function speakNextLanguage() {
    if (!isSpeaking || currentLanguageIndex >= languages.length) {
        console.log('Finished speaking all languages');
        stopSpeaking();
        return;
    }
    
    const language = languages[currentLanguageIndex];
    console.log(`Speaking language ${currentLanguageIndex + 1}/${languages.length}: ${language.name}`);
    speakLanguage(language, currentLanguageIndex);
    
    currentLanguageIndex++;
    
    // Schedule next language
    languageInterval = setTimeout(() => {
        speakNextLanguage();
    }, 3000);
}

// Speak a specific language
function speakLanguage(language, index) {
    if (!('speechSynthesis' in window)) {
        updateVoiceStatus('Speech synthesis not supported', 'error');
        return;
    }
    
    console.log(`Speaking: ${language.name} - "${language.text}"`);
    
    // Cancel any ongoing speech
    if (speechSynthesis) {
        speechSynthesis.cancel();
    }
    
    // Create new utterance
    speechUtterance = new SpeechSynthesisUtterance(language.text);
    speechUtterance.lang = language.code;
    speechUtterance.rate = 0.8;
    speechUtterance.pitch = 1;
    speechUtterance.volume = 1;
    
    // Update UI
    updateLanguageInfo(`Speaking: ${language.name}`);
    
    // Highlight current language
    document.querySelectorAll('.language-item').forEach((item, i) => {
        item.classList.toggle('speaking', i === index);
    });
    
    // Speak the text
    speechSynthesis = window.speechSynthesis;
    speechSynthesis.speak(speechUtterance);
    
    // Handle speech end
    speechUtterance.onend = () => {
        console.log(`Finished speaking: ${language.name}`);
        if (isSpeaking) {
            document.querySelectorAll('.language-item').forEach((item, i) => {
                item.classList.toggle('speaking', i === index);
            });
        }
    };
    
    // Handle speech error
    speechUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        updateVoiceStatus('Speech error', 'error');
    };
}

// Update voice status
function updateVoiceStatus(status, type = '') {
    const statusElement = document.getElementById('voiceStatus');
    if (!statusElement) return;
    
    statusElement.textContent = status;
    statusElement.className = `status-indicator ${type}`;
}

// Update language info
function updateLanguageInfo(info) {
    const languageInfo = document.getElementById('currentLanguage');
    if (languageInfo) {
        languageInfo.textContent = info;
    }
}

// Clean up when page unloads
window.addEventListener('beforeunload', () => {
    stopSpeaking();
});
