import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { FirebaseAuthStrategy } from './passport-firebase.strategy';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public validateCB;
  public constructor(func) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.validateCB = func;
  }

  async validate(payload) {
    return this.validateCB();
  }
}
