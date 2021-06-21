import { DynamicModule, Module } from '@nestjs/common';
import {
  FIREBASE_ADMIN_MODULE_OPTIONS,
  FIREBASE_ADMIN_INJECT,
} from './constants/firebase.constants';
import { PassportModule } from '@nestjs/passport';
import * as admin from 'firebase-admin';
import { FirebaseStrategy } from './strategies/firebase.strategy';
import { FirebaseService } from './services';
import { TwilioModule } from 'nestjs-twilio';
import { AuthzOptions } from './interfaces/authz-options.interface';

@Module({})
export class AuthModule {
  static async register(options: AuthzOptions): Promise<DynamicModule> {
    const imports = [],
      providers = [],
      exports = [];

    imports.push(PassportModule);

    if (options.firebase) {
      const firebaseAdminModuleOptions = {
        provide: FIREBASE_ADMIN_MODULE_OPTIONS,
        useValue: options.firebase,
      };

      const app =
        admin.apps.length === 0
          ? admin.initializeApp(options.firebase)
          : admin.apps[0];

      const firebaseAuthenticationProvider = {
        provide: FIREBASE_ADMIN_INJECT,
        useValue: app,
      };

      providers.push(
        firebaseAdminModuleOptions,
        firebaseAuthenticationProvider,
        FirebaseStrategy,
        FirebaseService,
      );
      exports.push(
        firebaseAdminModuleOptions,
        firebaseAuthenticationProvider,
        FirebaseStrategy,
        FirebaseService,
      );
    }

    if (options.twilio) {
      providers.push({
        provide: 'TWILIO_CONSTANT',
        useValue: {},
      });
      imports.push(TwilioModule.forRoot(options.twilio));
    }

    return {
      module: AuthModule,
      imports,
      providers,
      exports,
    };
  }
}
