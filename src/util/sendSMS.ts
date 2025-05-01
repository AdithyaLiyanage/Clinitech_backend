// src/utils/sendSMS.ts
import twilio from 'twilio';

interface SMSResult {
  success: boolean;
  sid?: string;
  error?: string;
}

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken  = process.env.TWILIO_AUTH_TOKEN!;
const fromNumber = process.env.TWILIO_FROM!;

const client = twilio(accountSid, authToken);

export const sendSMS = async (
  to: string,
  body: string
): Promise<SMSResult> => {
  try {
    const msg = await client.messages.create({
      from: fromNumber,
      to,
      body
    });
    console.log(`Twilio SID: ${msg.sid}`);
    return { success: true, sid: msg.sid };
  } catch (err: any) {
    console.error('Twilio sendSMS error:', err);
    return { success: false, error: err.message };
  }
};
