import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8082;
  app.enableCors({ origin: true, credentials: true });
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();

