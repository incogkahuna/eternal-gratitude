/* Send Page JavaScript */

let messageCount = 0;

// Initialize send page when page loads
function initializePageFeatures() {
    initializeSendInterface();
    setupEventListeners();
}

// Initialize the send interface
function initializeSendInterface() {
    const apiInput = document.getElementById('apiInput');
    const sendButton = document.getElementById('sendButton');
    const responseContent = document.getElementById('responseContent');
    
    if (!apiInput || !sendButton || !responseContent) return;
    
    // Set up initial response
    updateResponse({
        status: 'ready',
        message: 'Enter your gratitude message above and click Send Gratitude'
    });
    
    // Focus on input
    apiInput.focus();
}

// Set up event listeners
function setupEventListeners() {
    const apiInput = document.getElementById('apiInput');
    const sendButton = document.getElementById('sendButton');
    
    if (apiInput) {
        apiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendGratitude();
            }
        });
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', sendGratitude);
    }
}

// Send gratitude message
function sendGratitude() {
    const apiInput = document.getElementById('apiInput');
    const responseContent = document.getElementById('responseContent');
    const sendButton = document.getElementById('sendButton');
    
    if (!apiInput || !responseContent || !sendButton) return;
    
    const message = apiInput.value.trim();
    
    if (!message) {
        updateResponse({
            status: 'error',
            message: 'Please enter a gratitude message',
            error: 'Message cannot be empty'
        }, 'error');
        return;
    }
    
    // Show loading state
    sendButton.textContent = 'Sending...';
    sendButton.disabled = true;
    updateResponse({
        status: 'loading',
        message: 'Sending gratitude to Cindy...',
        timestamp: new Date().toISOString()
    }, 'loading');
    
    // Simulate API call
    setTimeout(() => {
        messageCount++;
        
        const response = {
            status: 'success',
            message: 'Gratitude sent successfully!',
            data: {
                id: `GRAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                message: message,
                recipient: 'Cindy',
                timestamp: new Date().toISOString(),
                count: messageCount
            },
            metadata: {
                server: 'thankyoucindy-api-v2.1.0',
                region: 'us-east-1',
                processing_time: '47ms'
            }
        };
        
        updateResponse(response, 'success');
        
        // Add to terminal output
        addTerminalOutput(`curl -X POST https://api.thankyoucindy.com/send -d '{"message":"${message}"}'`);
        
        // Reset form
        apiInput.value = '';
        sendButton.textContent = 'Send Gratitude';
        sendButton.disabled = false;
        apiInput.focus();
        
        // Show success notification
        window.ThankYouCindy.showNotification('✨ Gratitude sent to Cindy! ✨', 'success');
        
    }, 1500);
}

// Update response display
function updateResponse(response, type = 'success') {
    const responseContent = document.getElementById('responseContent');
    if (!responseContent) return;
    
    responseContent.textContent = JSON.stringify(response, null, 2);
    responseContent.className = `response-content ${type}`;
}

// Add output to terminal
function addTerminalOutput(command) {
    const terminalOutput = document.getElementById('terminalOutput');
    if (!terminalOutput) return;
    
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `
        <span class="prompt">$</span>
        <span class="command">${command}</span>
    `;
    
    terminalOutput.appendChild(line);
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    
    // Keep only last 10 lines
    const lines = terminalOutput.querySelectorAll('.terminal-line');
    if (lines.length > 10) {
        lines[0].remove();
    }
}

// Generate fake API responses for demonstration
function generateFakeResponses() {
    const responses = [
        {
            status: 'success',
            message: 'Gratitude processed successfully',
            data: {
                id: `GRAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                message: 'Thank you, Cindy!',
                recipient: 'Cindy',
                timestamp: new Date().toISOString()
            }
        },
        {
            status: 'success',
            message: 'Gratitude sent to Cindy',
            data: {
                id: `GRAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                message: 'Cindy, you are amazing!',
                recipient: 'Cindy',
                timestamp: new Date().toISOString()
            }
        }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}
