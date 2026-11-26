import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { Acteur } from '../acteurs/entities/acteur.entity';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);
  private readonly pdfServiceUrl = process.env.PDF_SERVICE_URL || 'http://reassurance-pdf:8000';
  
  // Cache du CSS pour éviter de lire le fichier à chaque appel
  private cssContent: string | null = null;

  constructor(private readonly httpService: HttpService) {}

  /**
   * Appel HTTP au microservice WeasyPrint
   */
  async generatePdf(html: string, filename: string): Promise<Buffer> {
    console.log(' __ PdfService.generatePdf __')
    console.log(' pdfServiceUrl:',this.pdfServiceUrl)
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.pdfServiceUrl}/generate`,
          { html, filename },
          { responseType: 'arraybuffer' },
        ),
      );
      return Buffer.from(response.data);
    } catch (error:any) {
      this.logger.error(`Erreur lors de l'appel au service PDF: ${error.message}`);
      throw new InternalServerErrorException('Impossible de générer le document PDF');
    }
  }

  /**
   * Prépare et génère le HTML d'un acteur
   */
  buildActeurHtml(acteur: Acteur): string {
    const roles : string[] = [];
    if (acteur.isCourtier) roles.push('Courtier');
    if (acteur.isCompagnieAssurance) roles.push("Compagnie d'Assurance");
    if (acteur.isReassureur) roles.push('Réassureur');
    if (acteur.isNous) roles.push('Interne');

    return this.renderTemplate('templates/acteurs' ,'acteur-single', {
      acteur,
      roles,
      dateGeneration: new Date().toLocaleDateString('fr-FR'),
    });
  }

  /**
   * Prépare et génère le HTML de la liste des acteurs
   */
  buildActeursListHtml(acteurs: Acteur[]): string {
    // On pré-calcule la chaîne des rôles pour chaque acteur pour simplifier le template
    const acteursFormates = acteurs.map((a, index) => {
      const roles : string[] =  [];
      if (a.isCourtier) roles.push('Courtier');
      if (a.isCompagnieAssurance) roles.push('Assurance');
      if (a.isReassureur) roles.push('Réassureur');
      if (a.isNous) roles.push('Nous');
      
      return {
        ...a,
        numeroLigne: index + 1, // Ajoute une propriété 1, 2, 3...
        rolesString: roles.join(', ') || '-',
      };
    });

    return this.renderTemplate('templates/acteurs' ,'acteur-list', {
      acteurs: acteursFormates,
      dateGeneration: new Date().toLocaleDateString('fr-FR'),
    });
  }
  /**
   * Prépare et génère le HTML d'une quittance'
   */
  buildQuittanceSingleHtml(quittanceContext: any): string {    
     console.log(' ____ PdfService.buildQuittanceSingleHtml  ____') 
     console.log('quittanceContext:',quittanceContext)
    return this.renderTemplate('templates/quittances' ,'quittance-single', {
       ...quittanceContext,
      dateGeneration: new Date().toLocaleDateString('fr-FR'),
    });
  }
  
  /**
   * Méthode utilitaire pour lire et compiler un template Handlebars
   */
  private renderTemplate(templateDirectory: string,templateName: string, context: any): string {
    try {
      // 1. Charger le CSS (avec cache)
      if (!this.cssContent) {
        const cssPath = path.join(__dirname, 'templates', 'style.css');
        this.cssContent = fs.readFileSync(cssPath, 'utf-8');
      }

      // 2. Charger le template HBS
      const templatePath = path.join(__dirname, templateDirectory, `${templateName}.hbs`);
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      
      // 3. Compiler et injecter les données
      const template = Handlebars.compile(templateSource);
      return template({ ...context, css: this.cssContent });
    } catch (error:any) {
      this.logger.error(`Erreur de lecture du template ${templateName}: ${error.message}`);
      throw new InternalServerErrorException(`Erreur de génération du template ${templateName}`);
    }
  }
}