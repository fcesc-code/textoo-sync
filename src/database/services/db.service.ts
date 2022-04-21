import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class DBService {
  hello() {
    return 'Hello World!';
  }
}
