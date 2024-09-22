
import axios from 'axios'

export async function sendNotification(to: string, receiverName: string, subject: string, htmlContent: string) {
    const apiKey = process.env.BREVO_API_KEY
    const url = 'https://api.brevo.com/v3/smtp/email'

    const data = {
        sender: { email: process.env.GMAIL_FROM_EMAIL, name: 'Dapp Admin' },
        to: [{ email: to, name: receiverName }],
        subject: subject,
        htmlContent: htmlContent
    }

    try {
        const response = await axios.post(url, data, {
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json'
            }
        })

        console.log('Brevo Email sent successfully:', response.data)
        return response.data
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}