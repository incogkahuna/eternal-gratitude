/* ================================================
   Gratitude Storage API Endpoint
   Vercel Serverless Function
   ================================================ */

// This is a simple mock endpoint for storing gratitude messages
// It doesn't send emails or persist data, just logs and returns success

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'MethodNotAllowed',
      message: 'Only POST requests are accepted',
      statusCode: 405
    });
  }
  
  try {
    const { message } = req.body;
    
    // Validate message
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Message field is required and cannot be empty',
        statusCode: 400
      });
    }
    
    // Log the message (visible in Vercel deployment logs)
    console.log('[GRATITUDE RECEIVED]', {
      timestamp: new Date().toISOString(),
      message: message.trim(),
      recipient: 'Cindy'
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
    
    // Generate response
    const messageId = 'grat_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    const gratitudeScore = (Math.random() * 5 + 95).toFixed(2);
    const processingTime = Math.floor(Math.random() * 80 + 10);
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: {
        message_id: messageId,
        recipient: 'Cindy',
        message: message.trim(),
        timestamp: new Date().toISOString(),
        gratitude_score: parseFloat(gratitudeScore),
        sentiment: 'EXTREMELY_POSITIVE',
        processed: true,
        delivery_status: 'DELIVERED',
        queue_position: 0,
        processing_time_ms: processingTime
      },
      metadata: {
        api_version: '2.7.3',
        server: process.env.VERCEL_REGION || 'local',
        rate_limit_remaining: Infinity,
        total_gratitude_sent: Math.floor(Math.random() * 90000000 + 10000000)
      },
      message: 'Gratitude successfully processed and delivered to Cindy ✨'
    });
    
  } catch (error) {
    console.error('[ERROR]', error);
    
    return res.status(500).json({
      error: 'InternalServerError',
      message: 'An error occurred while processing your gratitude',
      statusCode: 500
    });
  }
}

