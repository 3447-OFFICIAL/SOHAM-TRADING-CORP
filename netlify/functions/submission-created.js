// Netlify Serverless Function triggered on Form Submission
// Processes submissions from the "project-inquiry" form.

// 1. Input Sanitization Helper (XSS Prevention)
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
const DatabaseAdapter = {
    async saveSubmission(data) {
        console.log('[DB Adapter] Preparing data for database storage (Lead ID:', data.leadId, ')');
        
        // MongoDB Document Format
        const mongoDocument = {
            leadId: data.leadId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
            timestamp: new Date(data.timestamp),
            status: 'NEW_LEAD'
        };
        this.logMongoDB(mongoDocument);

        // PostgreSQL Insert Query Format
        const sqlQuery = {
            text: 'INSERT INTO project_inquiries(lead_id, name, email, phone, service, message, submitted_at, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [data.leadId, data.name, data.email, data.phone, data.service, data.message, data.timestamp, 'NEW_LEAD']
        };
        this.logPostgreSQL(sqlQuery);

        // MySQL Insert Query Format
        const mysqlQuery = {
            text: 'INSERT INTO project_inquiries SET ?',
            values: {
                lead_id: data.leadId,
                name: data.name,
                email: data.email,
                phone: data.phone,
                service: data.service,
                message: data.message,
                submitted_at: data.timestamp,
                status: 'NEW_LEAD'
            }
        };
        this.logMySQL(mysqlQuery);
        
        return { success: true, id: 'mock-db-id-12345' };
    },

    logMongoDB(doc) {
        console.log('[DB Ready Schema] MongoDB Document:', JSON.stringify(doc, null, 2));
    },

    logPostgreSQL(query) {
        console.log('[DB Ready Schema] PostgreSQL Query:', query.text, 'Values:', JSON.stringify(query.values));
    },

    logMySQL(query) {
        console.log('[DB Ready Schema] MySQL Query:', query.text, 'Values:', JSON.stringify(query.values));
    }
};

// 3. Resend ONLY Email Dispatch Integration
async function sendResendNotification(data) {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.NOTIFICATION_EMAIL || 'Sohamtrading.corp@gmail.com';
    const sender = process.env.SEND_EMAIL_FROM || 'onboarding@resend.dev';

    // Construct professional, enterprise-grade responsive HTML email template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Inquiry Received</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #333333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e1e8ed; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #0d0f17 0%, #00d2ff 100%); color: #ffffff; padding: 35px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
            .header p { margin: 5px 0 0 0; font-size: 13px; opacity: 0.85; }
            .content { padding: 30px 25px; }
            .lead-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px 20px; margin-bottom: 25px; text-align: center; }
            .lead-id { font-size: 18px; font-weight: 700; color: #00d2ff; letter-spacing: 0.05em; }
            .info-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .info-table th, .info-table td { padding: 12px 8px; text-align: left; border-bottom: 1px solid #edf2f7; vertical-align: top; }
            .info-table th { color: #718096; font-weight: 600; font-size: 12px; text-transform: uppercase; width: 150px; letter-spacing: 0.05em; }
            .info-table td { color: #2d3748; font-weight: 500; font-size: 14px; }
            .message-header { margin-top: 25px; color: #0d0f17; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; border-bottom: 2px solid #edf2f7; padding-bottom: 5px; }
            .message-box { background-color: #f7fafc; border-left: 4px solid #00d2ff; padding: 15px; margin-top: 10px; font-style: italic; white-space: pre-wrap; font-size: 14px; color: #4a5568; line-height: 1.5; border-radius: 0 4px 4px 0; }
            .footer { background-color: #f7fafc; padding: 20px; text-align: center; font-size: 11px; color: #a0aec0; border-top: 1px solid #edf2f7; line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Soham Trading Corp</h1>
                <p>Secure Project Inquiry Route</p>
            </div>
            <div class="content">
                <div class="lead-card">
                    <span style="font-size: 11px; text-transform: uppercase; color: #718096; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Generated Lead Identifier</span>
                    <span class="lead-id">${data.leadId}</span>
                </div>
                <table class="info-table">
                    <tr>
                        <th>Customer Name</th>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td><a href="mailto:${data.email}" style="color: #00d2ff; text-decoration: none;">${data.email}</a></td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <th>Service Required</th>
                        <td>${data.service}</td>
                    </tr>
                    <tr>
                        <th>Submission Date</th>
                        <td>${data.timestamp}</td>
                    </tr>
                </table>
                
                <div class="message-header">Project Description & Parameters</div>
                <div class="message-box">${data.message}</div>
            </div>
            <div class="footer">
                <p>This is an automated transmission secure notification dispatch from your Netlify application portal.</p>
                <p>&copy; ${new Date().getFullYear()} Soham Trading Corporation. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    console.log('[Mailer] Formulating Resend email payload to:', recipient);

    if (apiKey) {
        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    from: `Soham Trading Corp <${sender}>`,
                    to: [recipient],
                    subject: 'New Project Inquiry Received | Soham Trading Corp',
                    html: htmlContent
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Resend API returned status ${response.status}: ${errText}`);
            }

            const resData = await response.json();
            console.log('[Mailer] Resend transmission successful. Email ID:', resData.id);
            return { sent: true, emailId: resData.id };
        } catch (error) {
            console.error('[Mailer Error] Resend notification delivery failed:', error);
            throw error;
        }
    } else {
        console.warn('[Mailer Warning] Skipping email dispatch: RESEND_API_KEY environment variable is not defined.');
        console.log('[Mailer Log Fallback] Formatted HTML Content:\n', htmlContent);
        return { sent: false, reason: 'api_key_missing' };
    }
}

exports.handler = async function(event, context) {
    // Only process HTTP POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        let payload = {};
        if (event.isBase64Encoded) {
            const decoded = Buffer.from(event.body, 'base64').toString('utf-8');
            payload = Object.fromEntries(new URLSearchParams(decoded));
        } else {
            try {
                payload = JSON.parse(event.body);
            } catch {
                payload = Object.fromEntries(new URLSearchParams(event.body));
            }
        }

        // Netlify Forms passes values nested under "payload" in webhook callbacks, or flat in direct posts
        const data = payload.payload?.data || payload;
        const formName = payload.payload?.name || payload['form-name'];

        // 1. Verify Netlify Form Name
        if (formName !== 'project-inquiry') {
            console.log(`[Form Trigger] Ignored form submission for name: ${formName}`);
            return { statusCode: 200, body: JSON.stringify({ message: 'Ignored form submission' }) };
        }

        console.log('[Form Trigger] Processing project-inquiry submission');

        // 2. Honeypot check (Spam Prevention)
        const honeypot = data['bot-field'] || payload['bot-field'] || '';
        if (honeypot.trim().length > 0) {
            console.warn('[Security Warning] Honeypot field filled. Submission blocked as spam.');
            return { statusCode: 400, body: 'Spam submission detected.' };
        }

        // 3. Server-side validation
        const rawName = data.name || '';
        const rawEmail = data.email || '';
        const rawPhone = data.phone || '';
        const rawService = data.service || '';
        const rawMessage = data.message || '';

        if (!rawName.trim() || !rawEmail.trim() || !rawPhone.trim() || !rawMessage.trim()) {
            console.error('[Validation Error] Server-side check failed: missing required fields.');
            return { statusCode: 400, body: JSON.stringify({ error: 'Validation failed: Missing required fields.' }) };
        }

        // Detailed field length and email validation
        if (rawName.trim().length < 2) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Validation failed: Name too short.' }) };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(rawEmail.trim())) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Validation failed: Invalid email format.' }) };
        }

        if (rawMessage.trim().length < 15) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Validation failed: Description too short.' }) };
        }

        // Sanitization to prevent XSS / HTML injections
        const name = sanitizeHTML(rawName.trim());
        const email = sanitizeHTML(rawEmail.trim());
        const phone = sanitizeHTML(rawPhone.trim());
        const service = sanitizeHTML(rawService.trim());
        const message = sanitizeHTML(rawMessage.trim());

        // 4. Generate Lead ID in format STC-YYYY-XXXX
        const year = new Date().getFullYear();
        const randomSequence = String(Math.floor(Math.random() * 9000) + 1000); // Generates a safe 4-digit sequence
        const leadId = `STC-${year}-${randomSequence}`;

        const timestampOptions = { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'medium' };
        const submissionDate = new Date().toLocaleString('en-IN', timestampOptions) + ' (IST)';

        const submission = {
            leadId,
            name,
            email,
            phone,
            service,
            message,
            timestamp: submissionDate
        };

        // 5. Store to Database Ready Adapters
        const dbResult = await DatabaseAdapter.saveSubmission(submission);

        // 6. Resend Email Notification
        const emailResult = await sendResendNotification(submission);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'Inquiry processed successfully',
                leadId: submission.leadId,
                dbResult: dbResult,
                emailResult: emailResult
            })
        };

    } catch (err) {
        console.error('[Form Trigger Exception] Processing failed:', err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal Server Error', message: err.message })
        };
    }
};
