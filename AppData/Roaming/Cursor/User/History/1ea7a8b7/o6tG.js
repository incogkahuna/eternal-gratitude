// Vercel Serverless Function - Store Thanks API
// This function handles storing gratitude messages

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed',
            error: 'Only POST requests are allowed'
        });
    }
    
    try {
        const { message, recipient = 'Cindy' } = req.body;
        
        // Validate input
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid message',
                error: 'Message is required and must be a non-empty string'
            });
        }
        
        // Generate response data
        const responseData = {
            status: 'success',
            message: 'Gratitude stored successfully!',
            data: {
                id: `GRAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                message: message.trim(),
                recipient: recipient,
                timestamp: new Date().toISOString(),
                stored: true
            },
            metadata: {
                server: 'thankyoucindy-api-v2.1.0',
                region: 'us-east-1',
                processing_time: `${Math.floor(Math.random() * 100) + 10}ms`,
                version: '2.1.0'
            }
        };
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
        
        // Log the gratitude (in a real app, this would be stored in a database)
        console.log(`Gratitude stored: ${message} for ${recipient}`);
        
        // Return success response
        return res.status(200).json(responseData);
        
    } catch (error) {
        console.error('Error storing gratitude:', error);
        
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: 'Failed to store gratitude message'
        });
    }
}
