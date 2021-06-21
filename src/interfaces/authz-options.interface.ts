import * as admin from 'firebase-admin';
import { TwilioModuleOptions } from 'nestjs-twilio/dist/interfaces';
import { TwilioModuleAsyncOptions } from 'nestjs-twilio/dist/interfaces/twilio-options.interface';

export interface AuthzOptions {
  firebase?: admin.AppOptions;
  twilio?: TwilioModuleOptions;
}
