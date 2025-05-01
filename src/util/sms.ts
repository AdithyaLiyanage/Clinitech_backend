// utils/sms.ts
import axios from 'axios';

// Read the SMS.to API key and base URL from environment variables
const SMS_TO_API_KEY = process.env.SMS_TO_API_KEY;
const SMS_TO_BASE_URL = process.env.SMS_TO_BASE_URL || 'https://api.sms.to';

if (!SMS_TO_API_KEY) {
  throw new Error('SMS_TO_API_KEY environment variable is not set.');
}

interface SmsSendResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const sendSMS = async (to: string, message: string): Promise<SmsSendResponse> => {
  try {
    const response = await axios.post(
      `${SMS_TO_BASE_URL}/sms/send`, // Adjust endpoint as per SMS.to documentation
      {
        to,
        message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SMS_TO_API_KEY}`,
        },
      }
    );
    return { success: true, messageId: response.data.messageId };
  } catch (error: any) {
    console.error('Error sending SMS via SMS.to:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.error || error.message };
  }
};
