import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Get environment variables
  const port = configService.get<number>('PORT', 3001);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');
  const frontendUrl = configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
  
  // Set global prefix
  app.setGlobalPrefix(apiPrefix);
  
  // Enable CORS
  app.enableCors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  // Set up global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Neza API')
    .setDescription('The Neza platform API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/${apiPrefix}`);
}

bootstrap();