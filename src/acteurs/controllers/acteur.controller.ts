import { Controller, Get, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { Acteur } from '../entities/acteur.entity';
import { Response } from 'express';
import { FindManyOptions } from 'typeorm';
import { CreateActeurDto } from '../dto/create-acteur.dto';
import { UpdateActeurDto } from '../dto/update-acteur.dto';
import { ActeurService } from '../services/acteur.service';
import { PdfService } from 'src/pdf/pdf.service';

@ApiTags('Acteur')
@Controller('acteur')
export class ActeurController extends CrudController<Acteur, CreateActeurDto, UpdateActeurDto> {
  constructor(
    service: ActeurService , 
     private readonly pdfService: PdfService, // 🌟 Injection
  ) {
    super(service);
  }

   // les diffentes options ou filtre pour 
    protected buildOptions(query: any): FindManyOptions<Acteur> {
      const options: FindManyOptions<Acteur> = {
        where: {},
        order: {}, 
      };
      // --- AJOUT DU FILTRE PAR RÔLE ---
  // Exemple d'appel API : GET /acteur?roles=courtier,assureur,reassureur
  if (query.roles) {
    const rolesArray = query.roles.split(',').map((r: string) => r.trim().toLowerCase());
    const whereConditions: any[] = [];

    if (rolesArray.includes('courtier')) {
      whereConditions.push({ isCourtier: true });
    }
    if (rolesArray.includes('assureur') || rolesArray.includes('compagnieassurance')) {
      whereConditions.push({ isCompagnieAssurance: true });
    }
    if (rolesArray.includes('reassureur')) {
      whereConditions.push({ isReassureur: true });
    }

    // Si on a des conditions, on les applique (TypeORM fera un OR entre les éléments du tableau)
    if (whereConditions.length > 0) {
      options.where = whereConditions;
    }
    /*
    Utilisation
    GET /acteur?roles=courtier → Retourne uniquement les courtiers
    GET /acteur?roles=courtier,assureur → Retourne les courtiers ET les assureurs
    GET /acteur?roles=courtier,assureur,reassureur → Retourne les acteurs qui sont au moins l'un des trois
          
    */
  }
  // -------------------------------

      // tri
      const baseSort: any = {raisonSociale: 'ASC'};// Tri par défaut
      if( query.sortKey && query.sortDirection){
          options.order ={ [query.sortKey]: `${query.sortDirection}`}
      }else {
        options.order = baseSort
      }
  


      return options;
    }


@Get('print/all')
  async printAllActeurs(@Query() query: any, @Res() res: Response) {
    // On réutilise buildOptions pour garder les filtres (rôles, tri, etc.)
    console.log('______ ActeurController.printAllActeurs  _____ ')
    const options = this.buildOptions(query);
    const acteurs = await this.service.findAll(options);
    // console.log('______ query: ',query)
    // console.log('______ options: ',options)
    // console.log('______ acteurs: ',acteurs)
    const html = this.pdfService.buildActeursListHtml(acteurs);
   
    //console.log('html:',html)
    const pdfBuffer = await this.pdfService.generatePdf(html, 'liste-acteurs.pdf');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="liste-acteurs.pdf"', // inline pour affichage direct dans le navigateur/iframe
      'Content-Length': pdfBuffer.length.toString(),
    });
    res.end(pdfBuffer);
  }

  @Get(':id/print')
  async printActeur(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const acteur = await this.service.findOne(id);
    
    const html = this.pdfService.buildActeurHtml(acteur);
    const filename = `acteur-${acteur.numero || acteur.sigle || id}.pdf`;
    const pdfBuffer = await this.pdfService.generatePdf(html, filename);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`, // inline pour affichage direct
      'Content-Length': pdfBuffer.length.toString(),
    });
    res.end(pdfBuffer);
  }

}
