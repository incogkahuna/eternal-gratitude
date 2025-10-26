/* ================================================
   Gratitude Generator API - JavaScript
   ================================================ */

const form = document.getElementById('gratitude-form');
const messageInput = document.getElementById('message');
const responseSection = document.getElementById('response-section');
const responseOutput = document.getElementById('response-output');

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const message = messageInput.value.trim();
  
  if (!message) {
    showResponse({
      error: 'ValidationError',
      message: 'Message field cannot be empty',
      statusCode: 400
    }, true);
    return;
  }
  
  // Show loading state
  showLoading();
  
  // Simulate API processing delay
  await delay(window.ThankYouUtils.random(800, 1500));
  
  // Generate fake success response
  const response = generateSuccessResponse(message);
  showResponse(response);
  
  // Clear form
  messageInput.value = '';
});

// Show loading indicator
function showLoading() {
  responseSection.style.display = 'block';
  responseOutput.innerHTML = '<span class="loading-dots">Processing gratitude</span>';
}

// Generate realistic API success response
function generateSuccessResponse(message) {
  const timestamp = new Date().toISOString();
  const messageId = generateId();
  const processingTime = window.ThankYouUtils.random(12, 89);
  
  return {
    status: 'success',
    statusCode: 200,
    data: {
      message_id: messageId,
      recipient: 'Cindy',
      message: message,
      timestamp: timestamp,
      gratitude_score: window.ThankYouUtils.random(95, 100) + Math.random().toFixed(2),
      sentiment: 'EXTREMELY_POSITIVE',
      processed: true,
      delivery_status: 'DELIVERED',
      queue_position: 0,
      processing_time_ms: processingTime
    },
    metadata: {
      api_version: '2.7.3',
      server: 'gratitude-api-us-east-1a',
      rate_limit_remaining: Infinity,
      total_gratitude_sent: window.ThankYouUtils.random(10000000, 99999999)
    },
    message: 'Gratitude successfully processed and delivered to Cindy ✨'
  };
}

// Show response in terminal
function showResponse(data, isError = false) {
  responseSection.style.display = 'block';
  
  // Format JSON with syntax highlighting
  const formatted = JSON.stringify(data, null, 2);
  
  // Apply color coding
  const highlighted = syntaxHighlight(formatted);
  
  // Animate response
  responseOutput.innerHTML = '';
  typeWriter(highlighted, responseOutput);
}

// Syntax highlighting for JSON
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    
    const colors = {
      'key': 'var(--color-magenta)',
      'string': 'var(--color-cyan)',
      'number': 'var(--color-amber)',
      'boolean': 'var(--color-cyan)',
      'null': 'var(--color-gray)'
    };
    
    return `<span style="color: ${colors[cls]}">${match}</span>`;
  });
}

// Typewriter effect (simplified for performance)
function typeWriter(text, element, speed = 5) {
  element.innerHTML = text;
  element.style.opacity = '0';
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transition = 'opacity 0.3s ease';
  }, 100);
}

// Generate unique ID
function generateId() {
  return 'grat_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Delay utility
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

