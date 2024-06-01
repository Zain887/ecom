import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS to allow requests from 'http://localhost:3000'
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with the actual origin of your frontend application
  });

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('The e-commerce API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
