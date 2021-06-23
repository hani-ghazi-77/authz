import { DynamicModule, Module } from '@nestjs/common';
import {
  FIREBASE_ADMIN_MODULE_OPTIONS,
  FIREBASE_ADMIN_INJECT,
} from './constants/firebase.constants';
import { PassportModule } from '@nestjs/passport';
import * as admin from 'firebase-admin';
import { FirebaseStrategy } from './strategies/firebase.strategy';
import { FirebaseService } from './services';
import {AuthzOptions} from "./interfaces/authz-options.interface";

@Module({})
export class AuthModule {
  static async register(options: AuthzOptions): Promise<DynamicModule> {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useValue: options,
    };
    const app =
      admin.apps.length === 0 ? admin.initializeApp(options.firebase) : admin.apps[0];
    const firebaseAuthenticationProvider = {
      provide: FIREBASE_ADMIN_INJECT,
      useValue: app,
    };

    return {
      module: AuthModule,
      imports: [PassportModule],
      providers: [
        firebaseAdminModuleOptions,
        firebaseAuthenticationProvider,
        FirebaseStrategy,
        FirebaseService,
      ],
      exports: [
        firebaseAdminModuleOptions,
        firebaseAuthenticationProvider,
        FirebaseStrategy,
        FirebaseService,
      ],
    };
  }
}
