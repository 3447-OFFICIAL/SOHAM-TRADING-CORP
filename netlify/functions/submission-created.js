// Netlify Serverless Function triggered on Form Submission
// Triggers on any successful form submission captured by Netlify Forms.

// 1. Input Sanitization Helpers
function sanitizeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// 2. Database Adapter Ready Interface
// Decoupled structure allowing seamless future database integration without affecting the client
const DatabaseAdapter = {
    async saveSubmission(data) {
        console.log('[DB Adapter] Preparing data for database storage:', data);
        
        // Formatted MongoDB document placeholder
        const mongoDocument = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
            timestamp: new Date(data.timestamp),
            status: 'NEW_INQUIRY'
        };
        this.logMongoDB(mongoDocument);

        // Formatted PostgreSQL query parameters placeholder
        const sqlQuery = {
            text: 'INSERT INTO project_inquiries(name, email, phone, service, message, submitted_at, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [data.name, data.email, data.phone, data.service, data.message, data.timestamp, 'NEW_INQUIRY']
        };
        this.logPostgreSQL(sqlQuery);

        // Formatted MySQL query query parameters placeholder
        const mysqlQuery = {
            text: 'INSERT INTO project_inquiries SET ?',
            values: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                service: data.service,
                message: data.message,
                submitted_at: data.timestamp,
                status: 'NEW_INQUIRY'
            }
        };
        this.logMySQL(mysqlQuery);
        
        // Execute active connection here if configured. E.g.
        // if (process.env.MONGODB_URI) { await this.saveToMongoDB(mongoDocument); }
        return { success: true, id: 'mock-db-id-12345' };
    },

    logMongoDB(doc) {
        console.log('[DB Ready Schema] MongoDB Document:', JSON.stringify(doc, null, 2));
    },

    logPostgreSQL(query) {
        console.log('[DB Ready Schema] PostgreSQL query:', query.text, 'Values:', JSON.stringify(query.values));
    },

    logMySQL(query) {
        console.log('[DB Ready Schema] MySQL query:', query.text, 'Values:', JSON.stringify(query.values));
    }
};

// 3. Email Dispatch Integration
async function sendEmailNotification(data) {
    const recipients = ['sales@companydomain.com', 'info@companydomain.com'];
    
    // Construct professional, enterprise-grade HTML email template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Secure Project Inquiry</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f6f9fc; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; border: 1px solid #e1e8ed; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #0d0f17 0%, #00d2ff 100%); color: #ffffff; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; letter-spacing: 0.05em; }
            .content { padding: 30px; }
            .info-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .info-table th, .info-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eef2f5; vertical-align: top; }
            .info-table th { color: #8898aa; font-weight: 600; font-size: 13px; text-transform: uppercase; width: 160px; }
            .info-table td { color: #2c3e50; font-weight: 500; font-size: 15px; }
            .message-box { background: #f8f9fa; border-left: 3px solid #00d2ff; padding: 15px; margin-top: 10px; font-style: italic; white-space: pre-wrap; font-size: 14px; color: #4f5e71; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #8898aa; border-top: 1px solid #eef2f5; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Soham Trading Corp</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Secure Project Inquiry Transmission Received</p>
            </div>
            <div class="content">
                <p>A new secure project inquiry was submitted through the corporate website. Details are provided below:</p>
                <table class="info-table">
                    <tr>
                        <th>Your Name</th>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <th>Corporate Email</th>
                        <td><a href="mailto:${data.email}">${data.email}</a></td>
                    </tr>
                    <tr>
                        <th>Contact Number</th>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <th>Required Service</th>
                        <td>${data.service}</td>
                    </tr>
                    <tr>
                        <th>Timestamp</th>
                        <td>${data.timestamp}</td>
                    </tr>
                </table>
                
                <h3 style="margin-top: 30px; color: #0d0f17; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em;">Project Parameters & Message</h3>
                <div class="message-box">${data.message}</div>
            </div>
            <div class="footer">
                <p>This message was automatically generated by the secure application framework on Netlify.</p>
                <p>&copy; ${new Date().getFullYear()} Soham Trading Corporation. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    console.log('[Mailer] Formulated Notification Email for:', recipients.join(', '));
    
    // Check for configured APIs
    if (process.env.SENDGRID_API_KEY) {
        console.log('[Mailer] Dispatching email via SendGrid API...');
        try {
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: recipients,
                from: process.env.SEND_EMAIL_FROM || 'no-reply@companydomain.com',
                subject: `New Secure Project Inquiry - ${data.name}`,
                html: htmlContent,
            };
            await sgMail.send(msg);
            console.log('[Mailer] SendGrid dispatch successful.');
            return { sent: true, service: 'sendgrid' };
        } catch (error) {
            console.error('[Mailer Error] SendGrid failed:', error);
            throw error;
        }
    } else if (process.env.RESEND_API_KEY) {
        console.log('[Mailer] Dispatching email via Resend API...');
        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: process.env.SEND_EMAIL_FROM || 'no-reply@companydomain.com',
                    to: recipients,
                    subject: `New Secure Project Inquiry - ${data.name}`,
                    html: htmlContent
                })
            });
            if (!response.ok) {
                throw new Error(`Resend HTTP error! Status: ${response.status}`);
            }
            console.log('[Mailer] Resend dispatch successful.');
            return { sent: true, service: 'resend' };
        } catch (error) {
            console.error('[Mailer Error] Resend failed:', error);
            throw error;
        }
    } else {
        // Fallback: detailed print to server log so submissions are never lost and easy to debug
        console.warn('[Mailer Warning] Email dispatch skipped: SENDGRID_API_KEY or RESEND_API_KEY env variables not set.');
        console.log('[Mailer Fallback Log] Email Content:\n', htmlContent);
        return { sent: false, service: 'log_fallback' };
    }
}

exports.handler = async function(event, context) {
    // Only accept POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Netlify Forms triggers post body as URL-encoded payload or JSON payload inside event.body
        let payload = {};
        if (event.isBase64Encoded) {
            const decoded = Buffer.from(event.body, 'base64').toString('utf-8');
            payload = Object.fromEntries(new URLSearchParams(decoded));
        } else {
            try {
                // Try parsing JSON first
                payload = JSON.parse(event.body);
            } catch {
                // Fallback to URL-encoded parsing
                payload = Object.fromEntries(new URLSearchParams(event.body));
            }
        }

        // Netlify Forms triggers pass submission payload inside a "payload" object if using webhooks,
        // or directly in the event body. Let's resolve the form data.
        const data = payload.payload?.data || payload;
        const formName = payload.payload?.name || payload['form-name'];

        // Only process inquiries from the specific form
        if (formName !== 'project-inquiry') {
            console.log(`[Form Submission] Ignored unrelated form: ${formName}`);
            return { statusCode: 200, body: JSON.stringify({ message: 'Form ignored' }) };
        }

        console.log('[Form Submission] Received payload:', JSON.stringify(data, null, 2));

        // 4. Validate and Sanitize Inputs
        const rawName = data.name || '';
        const rawEmail = data.email || '';
        const rawPhone = data.phone || '';
        const rawService = data.service || '';
        const rawMessage = data.message || '';

        // Server-side validation checks
        if (!rawName || !rawEmail || !rawPhone || !rawMessage) {
            console.error('[Form Submission Error] Missing required fields.');
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
        }

        const name = sanitizeHTML(rawName.trim());
        const email = sanitizeHTML(rawEmail.trim());
        const phone = sanitizeHTML(rawPhone.trim());
        const service = sanitizeHTML(rawService.trim());
        const message = sanitizeHTML(rawMessage.trim());

        const submission = {
            name,
            email,
            phone,
            service,
            message,
            timestamp: new Date().toISOString()
        };

        // 5. Store to Database Ready Adapters
        const dbResult = await DatabaseAdapter.saveSubmission(submission);

        // 6. Dispatch Email Notifications
        const emailResult = await sendEmailNotification(submission);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'Inquiry processed successfully',
                dbId: dbResult.id,
                emailNotification: emailResult
            })
        };

    } catch (err) {
        console.error('[Form Submission Error] Processing failed:', err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal Server Error', message: err.message })
        };
    }
};
