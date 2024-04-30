import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import * as serviceAccount from '../dev.service-account.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await initializeFirestore();
  await app.listen(3000);
}

async function initializeFirestore() {
  admin.initializeApp({
    credential: admin.credential.cert(<admin.ServiceAccount>serviceAccount),
  });

  const firestore = admin.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  fireorm.initialize(firestore);
}

bootstrap();
