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
  
  // Speak the text
  speak(text, langCode, () => {
    if (isPlaying) {
      currentIndex++;
      // Delay before next language
      setTimeout(playNextLanguage, 1500);
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

// Stop the tour
function stopTour() {
  isPlaying = false;
  
  // Cancel speech
  if (speechSynthesis) {
    speechSynthesis.cancel();
  }
  
  // Reset display
  volumeNotice.style.display = 'block';
  languageContent.style.display = 'none';
  
  // Toggle buttons
  startButton.style.display = 'inline-block';
  stopButton.style.display = 'none';
  
  // Reset index
  currentIndexDisplay.textContent = 0;
  
  // Remove speaking class
  thankYouText.classList.remove('speaking');
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

