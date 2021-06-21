import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class TwilioService {
  constructor(@InjectTwilio() private readonly client: TwilioClient) {}

  async sendSMS(message: string, toPhoneNumber) {
    const twilio = this.configService.get<TwilioInterface>('twilio');
    try {
      return await this.client.messages.create({
        body: message,
        from: twilio.TWILIO_PHONE_NUMBER,
        to: toPhoneNumber,
      });
    } catch (e) {
      printBold(e.toString(), ERROR_COLOR, 'ERROR', ERROR_COLOR);
      return e;
    }
  }
}
