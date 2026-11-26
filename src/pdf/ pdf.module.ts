import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PdfService } from './pdf.service';

@Global() // <-- Rend le module accessible partout
@Module({
  imports: [HttpModule], // Fournit le HttpService
  providers: [PdfService],
  exports: [PdfService], // 🌟 CRUCIAL : rend le service disponible aux autres modules
})
export class PdfModule {}