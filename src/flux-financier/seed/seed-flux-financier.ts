import { DataSource } from 'typeorm';
import { CompteRubrique } from '../entities/compte-rubrique.entity';

export async function seedFluxFinancier(dataSource: DataSource): Promise<void> {
   
   await seedCompteRubrique(dataSource);
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
          isNonProportionnel : false,
          isProportionnel : true
        },
        {    
          code : "DPC",      
          libelle : "DEPOTS PRIMES (REC) CONSTITUES",
          partie : "FINANCIERE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {   
          code : "DSP",        
          libelle : "DEPOTS SINISTRES (SAP) CONSTITUES",
          partie : "FINANCIERE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {     
          code : "PE",      
          libelle : "PRIMES EMISES",
          partie : "TECHNIQUE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {  
          code : "SP",         
          libelle : "SINISTRES PAYES",
          partie : "TECHNIQUE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {      
          code : "PP",     
          libelle : "PRIME PROVISIONNELLE",
          partie : "TECHNIQUE",
          isNonProportionnel : true,
          isProportionnel : false
        },
        {
          code : "RPP", 
          libelle : "RETRAIT DE PORTEFEUILLE PRIME",
          partie : "TECHNIQUE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code : "DPL", 
          libelle : "DEPOTS PRIMES (REC) LIBERES",
          partie : "FINANCIERE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code : "DSL", 
          libelle : "DEPOTS SINISTRES (SAP) LIBERES",
          partie : "FINANCIERE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {
          code : "IDPL", 
          libelle : "INTERET SUR DEPOTS PRIMES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code : "IDSL", 
          libelle : "INTERET SUR DEPOTS SINISTRES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {
          code : "TSIPL", 
          libelle : "TAXE SUR INTERET DEPOTS PRIMES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code : "TIDSL", 
          libelle : "TAXE SUR INTERET DEPOTS SINISTRES LIBERES",
          partie : "FINANCIERE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {
          code : "COMM", 
          libelle : "COMMISSIONS",
          partie : "TECHNIQUE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code : "COUR", 
          libelle : "COURTAGE",
          partie : "TECHNIQUE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {
          code: "TC",
          libelle : "TAXE COURTAGE",
          partie : "TECHNIQUE",
          isNonProportionnel : true,
          isProportionnel : true
        },
        {
          code: "SCOMM",
          libelle : "SURCOMMISSION",
          partie : "TECHNIQUE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code: "PB",
          libelle : "PARTICIPATION BENEFICIAIRE",
          partie : "TECHNIQUE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code: "EPP", 
          libelle : "ENTRE PORTEFEUILLE PRIME",
          partie : "TECHNIQUE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code: "RPS",
          libelle : "RETRAIT DE PORTEFEUILLE SINISTRE",
          partie : "TECHNIQUE",
          isNonProportionnel : false,
          isProportionnel : true
        },
        {
          code: "SC",
          libelle : "SINISTRES AU COMPTANT",
          partie : "TECHNIQUE",
          isNonProportionnel : false,
          isProportionnel : true
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





