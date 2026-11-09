import { DataSource } from 'typeorm';
import {  CompteType } from '../entities/compte-type.entity';
import { CompteRubrique } from '../entities/compte-rubrique.entity';

export async function seedFluxFinancier(dataSource: DataSource): Promise<void> {
   
   await seedCompteRubrique(dataSource);
   await seedCompteType(dataSource);
  console.log('✅ Referentiel seed terminé avec succès (Idempotent)');
}
// //////////////////////////////////////////////////////
//   RUBRIQUE COMPTE 
// //////////////////////////////////////////////////////
async function seedCompteRubrique(dataSource: DataSource): Promise<void>{
  const compteRubriqueRepo = dataSource.getRepository(CompteRubrique);
 
  console.log('🔄 Vérification des données du flux financier...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const compteRubriquesData = [
        {
          code : "EPS",
          libelle : "ENTREE PORTEFEUILLE SINISTRE",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {    
          code : "DPC",      
          libelle : "DEPOTS PRIMES (REC) CONSTITUES",
          partie : "FINANCIERE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {   
          code : "DSP",        
          libelle : "DEPOTS SINISTRES (SAP) CONSTITUES",
          partie : "FINANCIERE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {     
          code : "PE",      
          libelle : "PRIMES EMISES",
          partie : "TECHNIQUE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {  
          code : "SP",         
          libelle : "SINISTRES PAYES",
          partie : "TECHNIQUE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {      
          code : "PP",     
          libelle : "PRIME PROVISIONNELLE",
          partie : "TECHNIQUE",
          isNonProportionnelle : true,
          isProportionnelle : false
        },
        {
          code : "RPP", 
          libelle : "RETRAIT DE PORTEFEUILLE PRIME",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code : "DPL", 
          libelle : "DEPOTS PRIMES (REC) LIBERES",
          partie : "FINANCIERE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code : "DSL", 
          libelle : "DEPOTS SINISTRES (SAP) LIBERES",
          partie : "FINANCIERE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {
          code : "IDPL", 
          libelle : "INTERET SUR DEPOTS PRIMES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code : "IDSL", 
          libelle : "INTERET SUR DEPOTS SINISTRES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {
          code : "TSIPL", 
          libelle : "TAXE SUR INTERET DEPOTS PRIMES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code : "TIDSL", 
          libelle : "TAXE SUR INTERET DEPOTS SINISTRES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {
          code : "COMM", 
          libelle : "COMMISSIONS",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code : "COUR", 
          libelle : "COURTAGE",
          partie : "TECHNIQUE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {
          code: "TC",
          libelle : "TAXE COURTAGE",
          partie : "TECHNIQUE",
          isNonProportionnelle : true,
          isProportionnelle : true
        },
        {
          code: "SCOMM",
          libelle : "SURCOMMISSION",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code: "PB",
          libelle : "PARTICIPATION BENEFICIAIRE",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code: "EPP", 
          libelle : "ENTRE PORTEFEUILLE PRIME",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code: "RPS",
          libelle : "RETRAIT DE PORTEFEUILLE SINISTRE",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        },
        {
          code: "SC",
          libelle : "SINISTRES AU COMPTANT",
          partie : "TECHNIQUE",
          isNonProportionnelle : false,
          isProportionnelle : true
        }
];
  console.log('🔄 La liste des compteRubriques ....');
  for (const compteRubriqueData of compteRubriquesData) {
    const existing = await compteRubriqueRepo.findOne({ where: { code: compteRubriqueData.code } });
    if (!existing) {
      await compteRubriqueRepo.save(compteRubriqueRepo.create(compteRubriqueData));
    }
  }


}
// //////////////////////////////////////////////////////
//    COMPTE TYPE
// //////////////////////////////////////////////////////
async function seedCompteType(dataSource: DataSource): Promise<void>{
  const compteTypeRepo = dataSource.getRepository(CompteType);
 
  console.log('🔄 Vérification des données compte type...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const compteTypesData = [
        { code : "AJS",  libelle : "AJUSTEMENT" },
        { code : "CPL",  libelle : "COMPLEMENTAIRE"},
        { code : "CCO",  libelle : "COURANT"},
        { code : "PEP",   libelle : "PERTE ET PROFIT"},
        { code : "PRE",  libelle : "PRELIMINAIRE"}
];
  console.log('🔄 La liste des compteRubriques ....');
  for (const compteType of compteTypesData) {
    const existing = await compteTypeRepo.findOne({ where: { code: compteType.code } });
    if (!existing) {
      await compteTypeRepo.save(compteTypeRepo.create(compteType));
    }
  }


}





