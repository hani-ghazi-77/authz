import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE_ADMIN_INJECT } from '../constants/firebase.constants';
import { FirebaseAdminSDK } from '../interfaces/firebase.interface';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private readonly fireSDK: FirebaseAdminSDK,
  ) {}

  base() {
    return this.fireSDK.auth();
  }
}
