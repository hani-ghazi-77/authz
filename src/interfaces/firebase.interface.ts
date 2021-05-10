import * as admin from 'firebase-admin';
import { ModuleMetadata } from '@nestjs/common';
import { JwtFromRequestFunction } from 'passport-jwt';

export interface FirebaseAdminModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (...args: any[]) => Promise<admin.AppOptions> | admin.AppOptions;
  inject?: any[];
}

export type FirebaseUser = admin.auth.DecodedIdToken;

export interface FirebaseAuthStrategyOptions {
  extractor: JwtFromRequestFunction;
  checkRevoked?: boolean;
}
export type FirebaseAdminSDK = admin.app.App;
