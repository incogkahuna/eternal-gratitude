/* ================================================
   Multilingual Gratitude - JavaScript
   Uses Web Speech API to speak "Thank you, Cindy" in multiple languages
   ================================================ */

const volumeNotice = document.getElementById('volumeNotice');
const languageContent = document.getElementById('languageContent');
const languageName = document.getElementById('languageName');
const thankYouText = document.getElementById('thankYouText');
const phoneticText = document.getElementById('phoneticText');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const currentIndexDisplay = document.getElementById('currentIndex');
const totalLanguagesDisplay = document.getElementById('totalLanguages');

// Language data: [language name, "Thank you, Cindy" translation, phonetic/romanization, speech synthesis lang code]
const languages = [
  ['English', 'Thank you, Cindy', '', 'en-US'],
  ['Spanish', 'Gracias, Cindy', 'GRAH-see-ahs', 'es-ES'],
  ['French', 'Merci, Cindy', 'mehr-SEE', 'fr-FR'],
  ['German', 'Danke, Cindy', 'DAHN-kuh', 'de-DE'],
  ['Italian', 'Grazie, Cindy', 'GRAHT-see-eh', 'it-IT'],
  ['Portuguese', 'Obrigado, Cindy', 'oh-bree-GAH-doo', 'pt-PT'],
  ['Dutch', 'Dank je, Cindy', 'dahnk yuh', 'nl-NL'],
  ['Russian', 'Спасибо, Синди', 'spah-SEE-boh', 'ru-RU'],
  ['Japanese', 'ありがとう、シンディ', 'arigatou', 'ja-JP'],
  ['Korean', '감사합니다, 신디', 'gam-sa-ham-ni-da', 'ko-KR'],
  ['Chinese (Mandarin)', '谢谢你，辛迪', 'xiè xiè nǐ', 'zh-CN'],
  ['Arabic', 'شكراً، سيندي', 'shukran', 'ar-SA'],
  ['Hindi', 'धन्यवाद, सिंडी', 'dhanyavaad', 'hi-IN'],
  ['Turkish', 'Teşekkürler, Cindy', 'teh-shek-kur-ler', 'tr-TR'],
  ['Polish', 'Dziękuję, Cindy', 'jen-KOO-yeh', 'pl-PL'],
  ['Swedish', 'Tack, Cindy', 'tahk', 'sv-SE'],
  ['Norwegian', 'Takk, Cindy', 'tahk', 'no-NO'],
  ['Danish', 'Tak, Cindy', 'tahk', 'da-DK'],
  ['Finnish', 'Kiitos, Cindy', 'KEE-tohs', 'fi-FI'],
  ['Greek', 'Ευχαριστώ, Σίντι', 'ef-kha-ree-STOH', 'el-GR'],
  ['Hebrew', 'תודה, סינדי', 'to-DAH', 'he-IL'],
  ['Czech', 'Děkuji, Cindy', 'DYEH-koo-yee', 'cs-CZ'],
  ['Hungarian', 'Köszönöm, Cindy', 'KUH-suh-nuhm', 'hu-HU'],
  ['Romanian', 'Mulțumesc, Cindy', 'mool-tsoo-MESK', 'ro-RO'],
  ['Thai', 'ขอบคุณ, ซินดี้', 'khop khun', 'th-TH'],
  ['Vietnamese', 'Cảm ơn, Cindy', 'gahm uhn', 'vi-VN'],
  ['Indonesian', 'Terima kasih, Cindy', 'tuh-REE-mah KAH-see', 'id-ID'],
  ['Malay', 'Terima kasih, Cindy', 'tuh-REE-mah KAH-seh', 'ms-MY'],
  ['Filipino', 'Salamat, Cindy', 'sah-LAH-maht', 'fil-PH'],
  ['Swahili', 'Asante, Cindy', 'ah-SAHN-teh', 'sw-KE'],
  ['Zulu', 'Ngiyabonga, Cindy', 'ng-yah-BOHN-gah', 'zu-ZA'],
  ['Afrikaans', 'Dankie, Cindy', 'DAHN-kee', 'af-ZA'],
  ['Icelandic', 'Takk fyrir, Cindy', 'tahk FIRR-ir', 'is-IS'],
  ['Welsh', 'Diolch, Cindy', 'DEE-olkh', 'cy-GB'],
  ['Irish', 'Go raibh maith agat, Cindy', 'guh rev mah AH-gut', 'ga-IE'],
  ['Scottish Gaelic', 'Tapadh leat, Cindy', 'TAH-puh let', 'gd-GB'],
  ['Catalan', 'Gràcies, Cindy', 'GRAH-see-es', 'ca-ES'],
  ['Basque', 'Eskerrik asko, Cindy', 'es-keh-REEK AHS-koh', 'eu-ES'],
  ['Ukrainian', 'Дякую, Сінді', 'DYAH-koo-yoo', 'uk-UA'],
  ['Slovak', 'Ďakujem, Cindy', 'JAH-koo-yem', 'sk-SK'],
  ['Croatian', 'Hvala, Cindy', 'HVAH-lah', 'hr-HR'],
  ['Serbian', 'Хвала, Синди', 'HVAH-lah', 'sr-RS'],
  ['Bulgarian', 'Благодаря, Синди', 'blah-goh-dah-RYAH', 'bg-BG'],
  ['Lithuanian', 'Ačiū, Cindy', 'ah-CHOO', 'lt-LT'],
  ['Latvian', 'Paldies, Cindy', 'PAHL-deess', 'lv-LV'],
  ['Estonian', 'Tänan, Cindy', 'TAH-nahn', 'et-EE'],
  ['Slovenian', 'Hvala, Cindy', 'HVAH-lah', 'sl-SI'],
  ['Bengali', 'ধন্যবাদ, সিন্ডি', 'dhon-no-bad', 'bn-BD'],
  ['Tamil', 'நன்றி, சிண்டி', 'nandri', 'ta-IN'],
  ['Telugu', 'ధన్యవాదములు, సింధి', 'dhan-ya-vaa-dha-mulu', 'te-IN']
];

let currentIndex = 0;
let isPlaying = false;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Initialize
function init() {
  totalLanguagesDisplay.textContent = languages.length;
  currentIndexDisplay.textContent = 0;
  
  // Check if speech synthesis is supported
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    phoneticText.textContent = '(Audio not supported in this browser)';
  }
}

// Start language tour
startButton.addEventListener('click', () => {
  if (isPlaying) return;
  
  isPlaying = true;
  currentIndex = 0;
  
  // Hide volume notice, show language content
  volumeNotice.style.display = 'none';
  languageContent.style.display = 'block';
  
  // Toggle buttons
  startButton.style.display = 'none';
  stopButton.style.display = 'inline-block';
  
  // Start the tour
  playNextLanguage();
});

// Stop language tour
stopButton.addEventListener('click', () => {
  stopTour();
});

// Play next language
function playNextLanguage() {
  if (!isPlaying || currentIndex >= languages.length) {
    // Tour complete, restart
    if (isPlaying) {
      currentIndex = 0;
    }
  }
  
  const [name, text, phonetic, langCode] = languages[currentIndex];
  
  // Update display
  updateDisplay(name, text, phonetic);
  
  // Update stats
  currentIndexDisplay.textContent = currentIndex + 1;
  
    // Speak the text (faster initial speed)
    speak(text, langCode, () => {
      if (isPlaying) {
        currentIndex++;
        // Faster initial delay
        setTimeout(playNextLanguage, 800);
      }
    });
}

// Update display with fade transition
function updateDisplay(name, text, phonetic) {
  // Fade out
  languageContent.classList.add('language-fade-out');
  
  setTimeout(() => {
    // Update content
    languageName.textContent = name;
    thankYouText.textContent = text;
    phoneticText.textContent = phonetic;
    
    // Fade in
    languageContent.classList.remove('language-fade-out');
    languageContent.classList.add('language-fade-in');
    
    setTimeout(() => {
      languageContent.classList.remove('language-fade-in');
    }, 500);
  }, 300);
}

// Speak text using Web Speech API
function speak(text, langCode, onEnd) {
  // Cancel any ongoing speech
  if (currentUtterance) {
    speechSynthesis.cancel();
  }
  
  if (!('speechSynthesis' in window)) {
    // Fallback: just delay if speech not supported
    setTimeout(onEnd, 2000);
    return;
  }
  
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = langCode;
  currentUtterance.rate = 0.9; // Slightly slower for clarity
  currentUtterance.pitch = 1.0;
  
  // Add speaking indicator
  currentUtterance.onstart = () => {
    thankYouText.classList.add('speaking');
  };
  
  currentUtterance.onend = () => {
    thankYouText.classList.remove('speaking');
    if (onEnd) onEnd();
  };
  
  currentUtterance.onerror = (event) => {
    console.warn('Speech error:', event);
    thankYouText.classList.remove('speaking');
    // Continue anyway
    if (onEnd) setTimeout(onEnd, 1000);
  };
  
  speechSynthesis.speak(currentUtterance);
}

// Stop the tour (but actually just go faster!)
function stopTour() {
  // The joke: "stop" actually makes it go faster!
  console.log('🎭 "Stop" button pressed - but the gratitude never ends!');
  
  // Change button text to reveal the joke
  stopButton.textContent = 'The Gratitude Never Ends';
  stopButton.style.background = 'var(--color-magenta)';
  stopButton.style.borderColor = 'var(--color-magenta)';
  stopButton.style.color = 'var(--color-bg)';
  
  // EXPONENTIAL SPEED INCREASE - starts fast, gets faster every second!
  let currentDelay = 50; // Start VERY fast
  let speedMultiplier = 0.5; // Each time, multiply by 0.5 (gets MUCH faster)
  
  // Override the playNextLanguage function with exponential acceleration
  const originalPlayNext = playNextLanguage;
  playNextLanguage = function() {
    if (!isPlaying || currentIndex >= languages.length) {
      // Tour complete, restart
      if (isPlaying) {
        currentIndex = 0;
      }
    }
    
    const [name, text, phonetic, langCode] = languages[currentIndex];
    
    // Update display
    updateDisplay(name, text, phonetic);
    
    // Update stats
    currentIndexDisplay.textContent = currentIndex + 1;
    
    // Speak the text (faster and faster rate)
    speak(text, langCode, () => {
      if (isPlaying) {
        currentIndex++;
        // EXPONENTIALLY FASTER DELAY!
        setTimeout(playNextLanguage, Math.max(currentDelay, 1)); // Minimum 1ms (INSANE!)
        currentDelay *= speedMultiplier; // Get faster each time!
      }
    });
  };
  
  // Show escalating messages
  const messages = [
    '🚀 SPEED MODE ACTIVATED!',
    '⚡ ACCELERATING...',
    '🔥 MAXIMUM VELOCITY!',
    '💥 BREAKING THE SOUND BARRIER!',
    '🌪️ GRATITUDE TORNADO!',
    '🚀 ESCAPING EARTH\'S GRAVITY!',
    '⭐ APPROACHING LIGHT SPEED!',
    '💫 TRANSCENDING REALITY!',
    '🌟 BECOMING ONE WITH GRATITUDE!'
  ];
  
  let messageIndex = 0;
  const showNextMessage = () => {
    if (messageIndex < messages.length) {
      const message = document.createElement('div');
      message.style.cssText = `
        position: fixed;
        top: ${20 + (messageIndex * 30)}px;
        right: 20px;
        background: var(--color-magenta);
        color: var(--color-bg);
        padding: 10px 20px;
        border-radius: 5px;
        font-family: var(--font-body);
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-size: ${1.2 + (messageIndex * 0.1)}rem;
      `;
      message.textContent = messages[messageIndex];
      document.body.appendChild(message);
      
      // Remove after shorter time as speed increases
      setTimeout(() => {
        message.style.animation = 'slideOutRight 0.1s ease forwards';
        setTimeout(() => message.remove(), 100);
      }, Math.max(500 - (messageIndex * 50), 100));
      
      messageIndex++;
      setTimeout(showNextMessage, 500); // Messages appear faster
    }
  };
  
  showNextMessage();
  
  // Disable the button so they can't "stop" again
  stopButton.disabled = true;
  stopButton.style.opacity = '0.7';
  stopButton.style.cursor = 'not-allowed';
  
  // Add some visual chaos as it gets faster
  let chaosInterval = setInterval(() => {
    if (currentDelay < 20) { // When it's really fast
      // Add random color flashes to the background
      document.body.style.animation = 'chaosFlash 0.05s ease infinite';
    }
  }, 500); // Check more frequently
  
  // Floating "Thank You" messages that pop up everywhere!
  const thankYouMessages = [
    'Thank You!', 'Thanks!', 'Grazie!', 'Merci!', 'Danke!', 
    'Arigato!', 'Xie Xie!', 'Spasibo!', 'Gracias!', 'Obrigado!',
    'Dank je!', 'Kiitos!', 'Tack!', 'Dziękuję!', 'Hvala!',
    '💜', '✨', '🌟', '💫', '🎉'
  ];
  
  let floatingInterval;
  const createFloatingThankYou = () => {
    const message = document.createElement('div');
    const text = thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)];
    
    message.textContent = text;
    message.style.cssText = `
      position: fixed;
      top: ${Math.random() * (window.innerHeight - 100)}px;
      left: ${Math.random() * (window.innerWidth - 200)}px;
      font-family: var(--font-heading);
      font-size: ${Math.random() * 30 + 20}px;
      font-weight: bold;
      color: ${['var(--color-cyan)', 'var(--color-magenta)', 'var(--color-amber)', 'var(--color-white)'][Math.floor(Math.random() * 4)]};
      z-index: 9999;
      pointer-events: none;
      animation: floatUp 2s ease-out forwards;
      text-shadow: 0 0 10px currentColor;
    `;
    
    document.body.appendChild(message);
    
    // Remove after animation
    setTimeout(() => message.remove(), 2000);
  };
  
  // Start floating messages when speed gets crazy
  const startFloatingChaos = () => {
    if (currentDelay < 30) {
      floatingInterval = setInterval(createFloatingThankYou, 100); // New message every 100ms!
    }
  };
  
  // Check speed and start floating chaos
  const speedCheckInterval = setInterval(() => {
    if (currentDelay < 30 && !floatingInterval) {
      startFloatingChaos();
    }
  }, 100);
  
  // Prevent page exit attempts (evil!)
  const preventExit = (e) => {
    e.preventDefault();
    e.returnValue = 'The gratitude never ends! You cannot escape!';
    return 'The gratitude never ends! You cannot escape!';
  };
  
  window.addEventListener('beforeunload', preventExit);
  
  // Add keyboard trap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
      e.preventDefault();
      // Show a message that they can't escape
      const escapeMessage = document.createElement('div');
      escapeMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-bg);
        color: var(--color-magenta);
        padding: 30px;
        border: 3px solid var(--color-magenta);
        border-radius: 10px;
        font-family: var(--font-body);
        font-weight: bold;
        font-size: 1.5rem;
        z-index: 10001;
        text-align: center;
        animation: pulse 0.5s ease infinite;
      `;
      escapeMessage.innerHTML = '🚫<br>You cannot escape the gratitude!<br>🚫';
      document.body.appendChild(escapeMessage);
      
      setTimeout(() => escapeMessage.remove(), 2000);
    }
  });
}

// Add CSS animations for the message and chaos effects
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  @keyframes chaosFlash {
    0% { background: var(--color-bg); }
    25% { background: var(--color-cyan); }
    50% { background: var(--color-magenta); }
    75% { background: var(--color-amber); }
    100% { background: var(--color-bg); }
  }
  @keyframes floatUp {
    0% {
      opacity: 1;
      transform: translateY(0) scale(0.5) rotate(0deg);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-50px) scale(1.2) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) scale(1.5) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
