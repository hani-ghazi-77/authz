import { Logger } from '@nestjs/common';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import {
  FirebaseUser,
  FirebaseAuthStrategyOptions,
} from '../interfaces/firebase.interface';
import { FIREBASE_AUTH, UNAUTHORIZED } from '../constants/firebase.constants';

export class FirebaseAuthStrategy extends Strategy {
  readonly name = FIREBASE_AUTH;
  private checkRevoked = false;

  constructor(
    options: FirebaseAuthStrategyOptions,
    private readonly extractor: JwtFromRequestFunction,
    private logger = new Logger(FirebaseAuthStrategy.name),
  ) {
    super();

    if (!options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor.',
      );
    }

    this.extractor = options.extractor;
    this.checkRevoked = options.checkRevoked;
  }

  async validate(payload: FirebaseUser): Promise<any> {
    return payload;
  }

  authenticate(req: Request): void {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.fail(UNAUTHORIZED, 401);

      return;
    }

    try {
      admin
        .auth()
        .verifyIdToken(idToken, this.checkRevoked)
        .then((res) => this.validateDecodedIdToken(res))
        .catch((err) => {
          this.fail({ err }, 401);
        });
    } catch (e) {
      this.logger.error(e);

      this.fail(e, 401);
    }
  }

  private async validateDecodedIdToken(decodedIdToken: FirebaseUser) {
    const result = await this.validate(decodedIdToken);

    if (result) {
      this.success(result);
    }

    this.fail(UNAUTHORIZED, 401);
  }
}
