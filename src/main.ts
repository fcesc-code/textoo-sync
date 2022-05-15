import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { DB_URI, FB_KEYS } from './KEYS/FIREBASE_KEYS';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  // const newPrivateKey: string = FB_KEYS.private_key.replace(/\\n/g, '\n');
  const adminConfig: ServiceAccount = {
    projectId: FB_KEYS.project_id,
    clientEmail: FB_KEYS.client_email,
    privateKey: FB_KEYS.private_key,
  };

  // const adminConfig: ServiceAccount = {
  //   projectId: configService.get<string>(FB_KEYS.project_id),
  //   clientEmail: configService.get<string>(FB_KEYS.client_email),
  //   privateKey: configService.get<string>(FB_KEYS.private_key),
  // };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: DB_URI,
  });

  app.enableCors();

  await app.listen(configService.get<string>('API_SYNC_PORT') || 4000);
}
bootstrap();
