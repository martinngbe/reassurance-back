import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './common/interceptors/format-response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AppLogger } from './common/logger/app-logger.service';
import { DataSource } from 'typeorm';
import { seedAuth } from './auth/seed/seed-auth';
import { seedActeur, seedAssure } from './acteurs/seed/seed-acteur';
import { seedReferentiel } from './referentiel/seed/seed-refentiel';
import { ClsService } from 'nestjs-cls';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { seedFluxFinancier } from './flux-financier/seed/seed-flux-financier';
import { seedPoliceQuittance } from './polices/seed/seed-police';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(AppLogger));

  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  const reflector = app.get(Reflector);


  app.useGlobalGuards(new JwtAuthGuard(reflector, app.get(ClsService)));

  const config = new DocumentBuilder()
    .setTitle('Réassurance Back API')
    .setDescription(
      "API de gestion de la réassurance : référentiel, acteurs, polices, quittances d'acceptation/cession, flux financiers et sinistres.",
    )
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (process.env.NODE_ENV !== 'production') {
    const dataSource = app.get(DataSource);
    await seedAuth(dataSource);
    await seedReferentiel(dataSource);
    await seedAssure(dataSource);
    await seedActeur(dataSource);
    await seedFluxFinancier(dataSource)
    await seedPoliceQuittance(dataSource)
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`reassurance-back démarré sur http://localhost:${port} (docs: /docs)`);
  console.log(`🚀 Application running on port ${port}`);
  console.log(`🔐 Toutes les routes sont protégées sauf celles marquées @Public()`);
}
bootstrap();