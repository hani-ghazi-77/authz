import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { FirebaseAuthStrategy } from './passport-firebase.strategy';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public constructor() {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
}
