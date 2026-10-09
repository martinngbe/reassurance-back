import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './common/interceptors/format-response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AppLogger } from './common/logger/app-logger.service';
import { DataSource } from 'typeorm';
import { seedAuth } from './auth/seed/seed-auth';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Important pour que les logs de démarrage soient capturés
  });
   // On remplace le logger interne de NestJS par le nôtre
  app.useLogger(app.get(AppLogger)); 
  // 1. Enregistrer l'intercepteur globalement
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  // 2. Enregistrer le filtre d'exception globalement
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // CORS
  app.enableCors();
  // ⬇️ Récupérez le Reflector injecté par NestJS
  const reflector = app.get(Reflector);

  // ⬇️ Passez-le au constructeur du Guard
  app.useGlobalGuards(new JwtAuthGuard(reflector));



  const config = new DocumentBuilder()
    .setTitle('Réassurance Back API')
    .setDescription(
      "API de gestion de la réassurance : référentiel, acteurs, polices, quittances d'acceptation/cession, flux financiers et sinistres.",
    )
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


 // Seed auth au démarrage (uniquement en développement)
  if (process.env.NODE_ENV !== 'production') {
    const dataSource = app.get(DataSource);
    await seedAuth(dataSource);
  }


  const port = process.env.PORT || 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`reassurance-back démarré sur http://localhost:${port} (docs: /docs)`);
  console.log(`🚀 Application running on port ${port}`);
  console.log(`🔐 Toutes les routes sont protégées sauf celles marquées @Public()`);
}
bootstrap();
