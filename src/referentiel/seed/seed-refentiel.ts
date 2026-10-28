import { DataSource } from 'typeorm';
import { Branche } from '../entities/branche.entity';
import { SousBranche } from '../entities/sous-branche.entity';
import { Region } from '../entities/region.entity';
import { Pays } from '../entities/pays.entity';
import { Devise } from '../entities/devise.entity';
import { DomaineActivite } from '../entities/domaine-activite.entity';
import { Mouvement } from '../entities/mouvement.entity';
import { NatureCession } from '../entities/nature-cession.entity';
import { NatureOffre } from '../entities/nature-offre.entity';

export async function seedReferentiel(dataSource: DataSource): Promise<void> {
   
   await seedBranche(dataSource);
   await seedRegion(dataSource);
   await seedDevise(dataSource)
   await seedDomaineActivite(dataSource)
   await seedMouvement(dataSource)
   await seedNatureCession(dataSource)
   await seedNatureOffre(dataSource)
  console.log('✅ Referentiel seed terminé avec succès (Idempotent)');
}
// //////////////////////////////////////////////////////
//   BRANCHE 
// //////////////////////////////////////////////////////
async function seedBranche(dataSource: DataSource): Promise<void>{
  const brancheRepo = dataSource.getRepository(Branche);
  const sousBrancheRepo = dataSource.getRepository(SousBranche);
 
  console.log('🔄 Vérification des données du referentiel...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const branchesData = [
        {code:'INC',libelle:'Incendie'},
        {code:'ACC',libelle:'Accidents'},
        {code:'AUT',libelle:'Automobile'},
        {code:'MAR',libelle:'Maritime, Aviation et Transport'},
        {code:'CON',libelle:'Construction et Montage'},
        {code:'VIE',libelle:'Vie'},
        {code:'SAN',libelle:'Santé et Maladie'},
        {code:'AGR',libelle:'Agriculture'},
        {code:'CRA',libelle:'Crédit et Caution'},
        {code:'RCG',libelle:'Risques Généraux'},
  ];
  console.log('🔄 La liste des branches ....');
  for (const brancheData of branchesData) {
    const existingBranchee = await brancheRepo.findOne({ where: { code: brancheData.code } });
    if (!existingBranchee) {
      await brancheRepo.save(brancheRepo.create(brancheData));
    }
  }

  const sousBranchesData = [
    {code:'INC-HAB',libelle:'Incendie Habitation',brancheId:1},
    {code:'INC-IND',libelle:'Incendie Industriel',brancheId:1},
    {code:'INC-COM',libelle:'Incendie Commercial',brancheId:1},
    {code:'ACC-IND',libelle:'Accidents Individuels',brancheId:2},
    {code:'ACC-SCO',libelle:'Accidents Scolaires',brancheId:2},
    {code:'ACC-VOL',libelle:'Accidents de Voyage',brancheId:2},
    {code:'AUT-RC',libelle:'Responsabilité Civile Automobile',brancheId:3},
    {code:'AUT-DOM',libelle:'Dommages Automobiles (Tous risques)',brancheId:3},
    {code:'AUT-2R',libelle:'Automobile Deux Roues',brancheId:3},
    {code:'MAR-CORP',libelle:'Corps de Navires',brancheId:4},
    {code:'MAR-FRET',libelle:'Fret Maritime',brancheId:4},
    {code:'MAR-AVIA',libelle:'Aviation',brancheId:4},
    {code:'MAR-FLUV',libelle:'Transport Fluvial',brancheId:4},
    {code:'CON-BAT',libelle:'Bâtiment',brancheId:5},
    {code:'CON-TP',libelle:'Travaux Publics',brancheId:5},
    {code:'CON-MON',libelle:'Montage Industriel',brancheId:5},
    {code:'VIE-DEC',libelle:'Décès',brancheId:6},
    {code:'VIE-RET',libelle:'Retraite',brancheId:6},
    {code:'VIE-EPAR',libelle:'Épargne',brancheId:6},
    {code:'VIE-GROU',libelle:'Vie Groupe',brancheId:6},
    {code:'SAN-MAL',libelle:'Maladie',brancheId:7},
    {code:'SAN-INC',libelle:'Incapacité / Invalidité',brancheId:7},
    {code:'SAN-FRA',libelle:'Frais de Santé',brancheId:7},
    {code:'AGR-RECO',libelle:'Récolte',brancheId:8},
    {code:'AGR-ELEV',libelle:'Élevage',brancheId:8},
    {code:'AGR-MULT',libelle:'Multirisque Agricole',brancheId:8},
    {code:'CRA-CRE',libelle:'Crédit',brancheId:9},
    {code:'CRA-CAU',libelle:'Caution',brancheId:9},
    {code:'CRA-FAI',libelle:'Faillite',brancheId:9},
    {code:'RCG-RC',libelle:'Responsabilité Civile Générale',brancheId:10},
    {code:'RCG-PRO',libelle:'Responsabilité Civile Professionnelle',brancheId:10},
    {code:'RCG-DEC',libelle:'Décennale',brancheId:10},
  ];

  for (const sousBrancheData of sousBranchesData) {
    const existing = await sousBrancheRepo.findOne({ where: { code: sousBrancheData.code } });
    if (!existing) {
      console.log(sousBrancheData)
      await sousBrancheRepo.save(sousBrancheRepo.create(sousBrancheData));
    }
  }


}
// //////////////////////////////////////////////////////
//   REGION 
// //////////////////////////////////////////////////////
async function seedRegion(dataSource: DataSource): Promise<void>{
   const regionRepo = dataSource.getRepository(Region);
   const paysRepo = dataSource.getRepository(Pays);

    // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const regionsData = [
    // 1-5
      { code: "AF-01",  libelle: "AFRIQUE DE L'OUEST",continent: "AFRIQUE"},
      { code: "AF-02",  libelle: "AFRIQUE DE L'EST",  continent: "AFRIQUE"},
      { code: "AF-03",  libelle: "AFRIQUE DU SUD",    continent: "AFRIQUE"},
      { code: "AF-04",  libelle: "AFRIQUE DU NORD",   continent: "AFRIQUE"},
      { code: "AF-05",  libelle: "AFRIQUE CENTRALE",  continent: "AFRIQUE"},
      // 6-9
      { code: "EU-01",  libelle: "EUROPE DE L'OUEST", continent: "EUROPE"},
      { code: "EU-02",  libelle: "EUROPE DE L'EST",   continent: "EUROPE"},
      { code: "EU-03",  libelle: "EUROPE DU SUD",     continent: "EUROPE"},
      { code: "EU-04",  libelle: "EUROPE DU NORD",    continent: "EUROPE"},
      // 10-13
      { code: "AS-01",  libelle: "ASIE DE L'OUEST",   continent: "ASIE"},
      { code: "AS-02",  libelle: "ASIE DE L'EST",     continent: "ASIE"},
      { code: "AS-03",  libelle: "ASIE DU SUD",       continent: "ASIE"},
      { code: "AS-04",  libelle: "ASIE DU NORD",      continent: "ASIE"},
       // 14 - 16
      { code: "AS-07",  libelle: "AMERIQUE DU NORD",  continent: "ASIE"},
      { code: "AS-05",  libelle: "AMERIQUE CENTRALE", continent: "ASIE"},
      { code: "AS-06",  libelle: "AMERIQUE DU SUD",   continent: "ASIE"},
      //17
      { code: "OC-01",  libelle: "OCEANIE",   continent: "OCEANIE"},
     
    ];

  console.log('🔄 La liste des regions ....');
  for (const regionData of regionsData) {
    const existing = await regionRepo.findOne({ where: { code: regionData.code } });
    if (!existing) {
      await regionRepo.save(regionRepo.create(regionData));
    }
  }
console.log('🔄 La liste des pays ....')
   const listePaysData =[
  // ===== AFRIQUE =====
  // Afrique de l'Ouest
  { "code": "BEN", "libelle": "BENIN", regionId: 1, "continent": "AFRIQUE", "isCima": true },
  { "code": "BFA", "libelle": "BURKINA FASO", regionId: 1, "continent": "AFRIQUE", "isCima": true },
  { "code": "CIV", "libelle": "COTE D'IVOIRE", regionId: 1, "continent": "AFRIQUE", "isCima": true },
  { "code": "CPV", "libelle": "CAP VERT", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "GHA", "libelle": "GHANA", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "GIN", "libelle": "GUINEE CONAKRY", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "GMB", "libelle": "GAMBIE", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "GNB", "libelle": "GUINEE BISSAU", regionId: 1, "continent": "AFRIQUE", "isCima": true },
  { "code": "LBR", "libelle": "LIBERIA", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "MLI", "libelle": "MALI", regionId: 1, "continent": "AFRIQUE", "isCima": true },
  { "code": "MRT", "libelle": "MAURITANIE", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "NER", "libelle": "NIGER", regionId: 1, "continent": "AFRIQUE", "isCima": true },
  { "code": "NGA", "libelle": "NIGERIA", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "SEN", "libelle": "SENEGAL", regionId: 1, "continent": "AFRIQUE", "isCima": true },
  { "code": "SLE", "libelle": "SIERRA LEONE", regionId: 1, "continent": "AFRIQUE", "isCima": false },
  { "code": "TGO", "libelle": "TOGO", regionId: 1, "continent": "AFRIQUE", "isCima": true },

  // Afrique Centrale
  { "code": "CAF", "libelle": "CENTRAFRIQUE",regionId: 5, "continent": "AFRIQUE", "isCima": true },
  { "code": "CMR", "libelle": "CAMEROUN", regionId: 5, "continent": "AFRIQUE", "isCima": true },
  { "code": "COD", "libelle": "REPUBLIQUE DEMOCRATIQUE DU CONGO", regionId: 5, "continent": "AFRIQUE", "isCima": false },
  { "code": "COG", "libelle": "CONGO BRAZZAVILLE", regionId: 5, "continent": "AFRIQUE", "isCima": true },
  { "code": "GAB", "libelle": "GABON", regionId: 5, "continent": "AFRIQUE", "isCima": true },
  { "code": "GNQ", "libelle": "GUINEE EQUATORIALE", regionId: 5, "continent": "AFRIQUE", "isCima": true },
  { "code": "STP", "libelle": "SAO TOME", regionId: 5, "continent": "AFRIQUE", "isCima": false },
  { "code": "TCD", "libelle": "TCHAD", regionId: 5, "continent": "AFRIQUE", "isCima": true },

  // Afrique de l'Est
  { "code": "BDI", "libelle": "BURUNDI", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "COM", "libelle": "UNION DES COMORES", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "DJI", "libelle": "DJIBOUTI", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "ERI", "libelle": "ERYTHREE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "ETH", "libelle": "ETHIOPIE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "KEN", "libelle": "KENYA", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "MDG", "libelle": "MADAGASCAR", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "MUS", "libelle": "ILES MAURICE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "MWI", "libelle": "MALAWI", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "MOZ", "libelle": "MOZAMBIQUE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "MYT", "libelle": "MAYOTTE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "REU", "libelle": "REUNION", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "RWA", "libelle": "RWANDA", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "SYC", "libelle": "SEYCHELLES", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "SOM", "libelle": "SOMALIE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "SSD", "libelle": "SOUDAN DU SUD", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "TZA", "libelle": "TANZANIE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "UGA", "libelle": "OUGANDA", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "ZMB", "libelle": "ZAMBIE", regionId: 2, "continent": "AFRIQUE", "isCima": false },
  { "code": "ZWE", "libelle": "ZIMBABWE", regionId: 2, "continent": "AFRIQUE", "isCima": false },

  // Afrique du Nord
  { "code": "DZA", "libelle": "ALGERIE", regionId: 4, "continent": "AFRIQUE", "isCima": false },
  { "code": "EGY", "libelle": "EGYPTE", regionId: 4, "continent": "AFRIQUE", "isCima": false },
  { "code": "ESH", "libelle": "SAHARA OCCIDENTAL", regionId: 4, "continent": "AFRIQUE", "isCima": false },
  { "code": "LBY", "libelle": "LIBYE", regionId: 4, "continent": "AFRIQUE", "isCima": false },
  { "code": "MAR", "libelle": "MAROC", regionId: 4, "continent": "AFRIQUE", "isCima": false },
  { "code": "SDN", "libelle": "SOUDAN KHARTOUM", regionId: 4, "continent": "AFRIQUE", "isCima": false },
  { "code": "TUN", "libelle": "TUNISIE", regionId: 4, "continent": "AFRIQUE", "isCima": false },

  // Afrique du Sud (Australe)
  { "code": "AGO", "libelle": "ANGOLA", regionId: 3, "continent": "AFRIQUE", "isCima": false },
  { "code": "BWA", "libelle": "BOTSWANA", regionId: 3, "continent": "AFRIQUE", "isCima": false },
  { "code": "LSO", "libelle": "LESOTHO", regionId: 3, "continent": "AFRIQUE", "isCima": false },
  { "code": "NAM", "libelle": "NAMIBIE", regionId: 3, "continent": "AFRIQUE", "isCima": false },
  { "code": "SWZ", "libelle": "ESWATINI", regionId: 3, "continent": "AFRIQUE", "isCima": false },
  { "code": "ZAF", "libelle": "AFRIQUE DU SUD", regionId: 3, "continent": "AFRIQUE", "isCima": false },

  // ===== EUROPE =====
  // Europe de l'Ouest
  { "code": "AUT", "libelle": "AUTRICHE", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "BEL", "libelle": "BELGIQUE", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "CHE", "libelle": "SUISSE", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "DEU", "libelle": "ALLEMAGNE", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "FRA", "libelle": "FRANCE", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "LIE", "libelle": "LIECHTENSTEIN", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "LUX", "libelle": "LUXEMBOURG", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "MCO", "libelle": "MONACO", regionId: 6, "continent": "EUROPE", "isCima": false },
  { "code": "NLD", "libelle": "PAYS-BAS", regionId: 6, "continent": "EUROPE", "isCima": false },

  // Europe de l'Est
  { "code": "BGR", "libelle": "BULGARIE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "BLR", "libelle": "BIELORUSSIE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "CZE", "libelle": "REPUBLIQUE TCHEQUE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "HUN", "libelle": "HONGRIE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "MDA", "libelle": "MOLDAVIE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "POL", "libelle": "POLOGNE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "ROU", "libelle": "ROUMANIE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "RUS", "libelle": "RUSSIE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "SVK", "libelle": "SLOVAQUIE", regionId: 7, "continent": "EUROPE", "isCima": false },
  { "code": "UKR", "libelle": "UKRAINE", regionId: 7, "continent": "EUROPE", "isCima": false },

  // Europe du Nord
  { "code": "ALA", "libelle": "ILES ALAND", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "DNK", "libelle": "DANEMARK", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "EST", "libelle": "ESTONIE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "FIN", "libelle": "FINLANDE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "FRO", "libelle": "ILES FEROE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "GBR", "libelle": "ROYAUME-UNI", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "GGY", "libelle": "GUERNESEY", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "IMN", "libelle": "ILE DE MAN", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "IRL", "libelle": "IRLANDE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "ISL", "libelle": "ISLANDE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "JEY", "libelle": "JERSEY", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "LTU", "libelle": "LITUANIE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "LVA", "libelle": "LETTONIE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "NOR", "libelle": "NORVEGE", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "SJM", "libelle": "SVALBARD ET JAN MAYEN", regionId: 9, "continent": "EUROPE", "isCima": false },
  { "code": "SWE", "libelle": "SUEDE", regionId: 9, "continent": "EUROPE", "isCima": false },

  // Europe du Sud
  { "code": "ALB", "libelle": "ALBANIE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "AND", "libelle": "ANDORRE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "BIH", "libelle": "BOSNIE-HERZEGOVINE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "ESP", "libelle": "ESPAGNE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "GIB", "libelle": "GIBRALTAR", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "GRC", "libelle": "GRECE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "HRV", "libelle": "CROATIE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "ITA", "libelle": "ITALIE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "MKD", "libelle": "MACEDOINE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "MLT", "libelle": "MALTE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "MNE", "libelle": "MONTENEGRO", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "PRT", "libelle": "PORTUGAL", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "SMR", "libelle": "SAINT-MARIN", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "SRB", "libelle": "SERBIE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "SVN", "libelle": "SLOVENIE", regionId: 8, "continent": "EUROPE", "isCima": false },
  { "code": "VAT", "libelle": "SAINT-SIEGE (VATICAN)", regionId: 8, "continent": "EUROPE", "isCima": false },

  // ===== ASIE =====
  // Asie de l'Ouest
  { "code": "AEA", "libelle": "EMIRATS ARABES UNIS - AJMAN", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "AED", "libelle": "EMIRATS ARABES UNIS - DUBAI", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "AEF", "libelle": "EMIRATS ARABES UNIS - FUJAIRAH", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "AEK", "libelle": "EMIRATS ARABES UNIS - RAS EL KHAIMAH", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "AES", "libelle": "EMIRATS ARABES UNIS - SHARJAH", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "AEZ", "libelle": "EMIRATS ARABES UNIS - ABOU DHABI", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "ARM", "libelle": "ARMENIE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "AUQ", "libelle": "EMIRATS ARABES UNIS - OUMN AL QAIWAIN", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "AZE", "libelle": "AZERBAIJAN", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "BHR", "libelle": "BAHREIN", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "CYP", "libelle": "CHYPRE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "GEO", "libelle": "GEORGIE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "IRN", "libelle": "IRAN", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "IRQ", "libelle": "IRAQ", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "ISR", "libelle": "ISRAEL", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "JOR", "libelle": "JORDANIE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "KWT", "libelle": "KOWEIT", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "LBN", "libelle": "LIBAN", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "OMN", "libelle": "OMAN", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "PSE", "libelle": "PALESTINE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "QAT", "libelle": "QATAR", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "SAU", "libelle": "ARABIE SAOUDITE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "SYR", "libelle": "SYRIE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "TUR", "libelle": "TURQUIE", regionId: 10, "continent": "ASIE", "isCima": false },
  { "code": "YEM", "libelle": "YEMEN", regionId: 10, "continent": "ASIE", "isCima": false },

  // Asie de l'Est
  { "code": "CHN", "libelle": "CHINE", regionId: 11, "continent": "ASIE", "isCima": false },
  { "code": "HKG", "libelle": "HONG KONG", regionId: 11, "continent": "ASIE", "isCima": false },
  { "code": "JPN", "libelle": "JAPON", regionId: 11, "continent": "ASIE", "isCima": false },
  { "code": "KOR", "libelle": "COREE DU SUD", regionId: 11, "continent": "ASIE", "isCima": false },
  { "code": "MAC", "libelle": "MACAO", regionId: 11, "continent": "ASIE", "isCima": false },
  { "code": "MNG", "libelle": "MONGOLIE", regionId: 11, "continent": "ASIE", "isCima": false },
  { "code": "PRK", "libelle": "COREE DU NORD", regionId: 11, "continent": "ASIE", "isCima": false },
  { "code": "TWN", "libelle": "TAIWAN", regionId: 11, "continent": "ASIE", "isCima": false },

  // Asie du Sud
  { "code": "AFG", "libelle": "AFGHANISTAN", regionId: 12, "continent": "ASIE", "isCima": false },
  { "code": "BGD", "libelle": "BANGLADESH", regionId: 12, "continent": "ASIE", "isCima": false },
  { "code": "BTN", "libelle": "BHOUTAN", regionId: 12, "continent": "ASIE", "isCima": false },
  { "code": "IND", "libelle": "INDE", regionId: 12, "continent": "ASIE", "isCima": false },
  { "code": "LKA", "libelle": "SRI LANKA", regionId: 12, "continent": "ASIE", "isCima": false },
  { "code": "MDV", "libelle": "MALDIVES", regionId: 12, "continent": "ASIE", "isCima": false },
  { "code": "NPL", "libelle": "NEPAL", regionId: 12, "continent": "ASIE", "isCima": false },
  { "code": "PAK", "libelle": "PAKISTAN", regionId: 12, "continent": "ASIE", "isCima": false },

  // Asie Centrale
  { "code": "KAZ", "libelle": "KAZAKHSTAN", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "KGZ", "libelle": "KIRGHIZISTAN", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "TJK", "libelle": "TADJIKISTAN", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "TKM", "libelle": "TURKMENIE", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "UZB", "libelle": "OUZBEKISTAN", regionId: 13, "continent": "ASIE", "isCima": false },

  // Asie du Sud-Est
  { "code": "BRN", "libelle": "BRUNEI DARUSSALAM", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "IDN", "libelle": "INDONESIE", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "KHM", "libelle": "CAMBODGE", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "LAO", "libelle": "LAOS", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "MMR", "libelle": "MYANMAR", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "MYS", "libelle": "MALAISIE", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "PHL", "libelle": "PHILIPPINES", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "SGP", "libelle": "SINGAPOUR", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "THA", "libelle": "THAILANDE", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "TLS", "libelle": "TIMOR-LESTE", regionId: 13, "continent": "ASIE", "isCima": false },
  { "code": "VNM", "libelle": "VIETNAM", regionId: 13, "continent": "ASIE", "isCima": false },

  // ===== AMERIQUE =====
  // Amérique du Nord
  { "code": "BMU", "libelle": "BERMUDES", regionId: 14, "continent": "AMERIQUE", "isCima": false },
  { "code": "CAN", "libelle": "CANADA", regionId: 14, "continent": "AMERIQUE", "isCima": false },
  { "code": "GRL", "libelle": "GROENLAND", regionId: 14, "continent": "AMERIQUE", "isCima": false },
  { "code": "MEX", "libelle": "MEXIQUE", regionId: 14, "continent": "AMERIQUE", "isCima": false },
  { "code": "SPM", "libelle": "SAINT-PIERRE-ET-MIQUELON", regionId: 14, "continent": "AMERIQUE", "isCima": false },
  { "code": "USA", "libelle": "ETATS UNIS", regionId: 14, "continent": "AMERIQUE", "isCima": false },

  // Amérique Centrale et Caraïbes
  { "code": "ABW", "libelle": "ARUBA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "AIA", "libelle": "ANGUILLA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "ATG", "libelle": "ANTIGUA-ET-BARBUDA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "BHS", "libelle": "BAHAMAS", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "BLM", "libelle": "SAINT-BARTHELEMY", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "BLZ", "libelle": "BELIZE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "BRB", "libelle": "BARBADE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "CRI", "libelle": "COSTA RICA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "CUB", "libelle": "CUBA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "CYM", "libelle": "ILES CAYMAN", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "DMA", "libelle": "DOMINIQUE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "DOM", "libelle": "REPUBLIQUE DOMINICAINE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "GLP", "libelle": "GUADELOUPE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "GRD", "libelle": "GRENADE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "GTM", "libelle": "GUATEMALA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "HND", "libelle": "HONDURAS", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "HTI", "libelle": "HAITI", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "JAM", "libelle": "JAMAIQUE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "KNA", "libelle": "SAINT-KITTS-ET-NEVIS", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "LCA", "libelle": "SAINTE-LUCIE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "MAF", "libelle": "SAINT-MARTIN (PARTIE FRANÇAISE)", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "MSR", "libelle": "MONTSERRAT", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "MTQ", "libelle": "MARTINIQUE", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "NIC", "libelle": "NICARAGUA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "PAN", "libelle": "PANAMA", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "PRI", "libelle": "PUERTO RICO", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "SLV", "libelle": "SALVADOR", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "SXM", "libelle": "SAINT-MARTIN (PARTIE NEERLANDAISE)", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "TCA", "libelle": "ILES TURQUES-ET-CAIQUES", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "TTO", "libelle": "TRINITE ET TOBAGO", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "VCT", "libelle": "SAINT-VINCENT-ET-LES GRENADINES", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "VGB", "libelle": "BRITISH VIRGIN ISLANDS", regionId: 15, "continent": "AMERIQUE", "isCima": false },
  { "code": "VIR", "libelle": "ILES VIERGES AMERICAINES", regionId: 15, "continent": "AMERIQUE", "isCima": false },

  // Amérique du Sud
  { "code": "ARG", "libelle": "ARGENTINE", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "BOL", "libelle": "BOLIVIE", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "BRA", "libelle": "BRESIL", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "CHL", "libelle": "CHILI", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "COL", "libelle": "COLOMBIE", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "ECU", "libelle": "EQUATEUR", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "FLK", "libelle": "ILES FALKLAND", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "GUF", "libelle": "GUYANE FRANCAISE", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "GUY", "libelle": "GUYANE", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "PER", "libelle": "PEROU", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "PRY", "libelle": "PARAGUAY", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "SUR", "libelle": "SURINAME", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "URY", "libelle": "URUGUAY", regionId: 16, "continent": "AMERIQUE", "isCima": false },
  { "code": "VEN", "libelle": "VENEZUELA", regionId: 16, "continent": "AMERIQUE", "isCima": false },

  // ===== OCEANIE ET AUTRES TERRITOIRES =====
  { "code": "ASM", "libelle": "SAMOA AMERICAINES", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "AUS", "libelle": "AUSTRALIE", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "CCK", "libelle": "ILES COCOS", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "COK", "libelle": "ILES COOK", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "CXR", "libelle": "ILE CHRISTMAS", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "FJI", "libelle": "FIDJI", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "FSM", "libelle": "MICRONESIE", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "GUM", "libelle": "GUAM", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "KIR", "libelle": "KIRIBATI", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "MHL", "libelle": "ILES MARSHALL", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "MNP", "libelle": "ILES MARIANNES DU NORD", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "NCL", "libelle": "NOUVELLE-CALEDONIE", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "NFK", "libelle": "ILE NORFOLK", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "NIU", "libelle": "NIUE", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "NRU", "libelle": "NAURU", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "NZN", "libelle": "NOUVELLE ZELANDE", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "PCN", "libelle": "PITCAIRN", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "PLW", "libelle": "PALAU", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "PNG", "libelle": "PAPOUASIE-NOUVELLE-GUINEE", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "PYF", "libelle": "POLYNESIE FRANCAISE", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "SLB", "libelle": "ILES SALOMON", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "TKL", "libelle": "TOKELAU", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "TON", "libelle": "TONGA", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "TUV", "libelle": "TUVALU", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "UMI", "libelle": "ILES MINEURES ELOIGNEES DES ETATS-UNIS", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "VUT", "libelle": "VANUATU", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "WLF", "libelle": "WALLIS-ET-FUTUNA", regionId: 17, "continent": "OCEANIE", "isCima": false },
  { "code": "WSM", "libelle": "SAMOA", regionId: 17, "continent": "OCEANIE", "isCima": false }
];

  for (const paysData of listePaysData) {
    const existing = await paysRepo.findOne({ where: { code: paysData.code } });
    if (!existing) {
     // console.log(paysData)
      await paysRepo.save(paysRepo.create(paysData));
    }
  }

}
// //////////////////////////////////////////////////////
//   DEVISE 
// //////////////////////////////////////////////////////
async function seedDevise(dataSource: DataSource): Promise<void>{
   const deviseRepo = dataSource.getRepository(Devise);
   
    // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const devisesData = [
    {  libelle: "FRANC COMORIEN", code: "KMF", isLocale: 0 , cours:1},
    {  libelle: "FRANC COMORIEN", code: "KMF",  isLocale: 0 , cours:1},
    {  libelle: "OUGUIYA MAURITANIEN (NOUVEAU)", code: "MRU", isLocale: 0 , cours:1}, 
    {  libelle: "FRANC CONGOLAIS (RDC)", code: "CDF", isLocale: 0 , cours:1}, 
    { libelle: "IRAK DINAR", code: "IQD", isLocale: 0 , cours:1}, 
    {  libelle: "ESCUDO", code: "CVE", isLocale: 0 , cours:1},
    {  libelle: "KWANZA ANGOLAIS", code: "AOA", isLocale: 0 , cours:1},
    {  libelle: "RIAL IRANIEN", code: "IRR", isLocale: 0 , cours:1}, 
    {  libelle: "LIVRE SOUDANAISE", code: "SDG", isLocale: 0 , cours:1},
    {  libelle: "DOLLAR LIBERIEN", code: "LRD", isLocale: 0 , cours:1},
    {  libelle: "SEYCHELLES - ROUPIE", code: "SCR", isLocale: 0 , cours:1},
    {  libelle: "KWACHA ZAMBIEN", code: "ZMW", isLocale: 0 , cours:1},
    {  libelle: "RAND SUD AFRICAIN", code: "ZAR", isLocale: 0 , cours:1}, 
    {  libelle: "RIAL YEMENITE", code: "YER", isLocale: 0 , cours:1},
    {  libelle: "CFA UEMOA", code: "XOF", isLocale: 1}, 
    {  libelle: "CFA AFRIQUE CENTRALE", code: "XAF", isLocale: 0 , cours:1},
    {  libelle: "DONG VIETNAMIEN", code: "VND", isLocale: 0 , cours:1},
    {  libelle: "BOLIVAR VENUZUELIEN", code: "VEF", isLocale: 0 , cours:1},
    {  libelle: "DOLLAR AMERICAIN", code: "USD", isLocale: 0 , cours:1}, 
    {  libelle: "SHILLING OUGANDAIS", code: "UGX", isLocale: 0 , cours:1}, 
    {  libelle: "HRYVNIA UKRAINIENNE", code: "UAH", isLocale: 0 , cours:1}, 
    {  libelle: "SHILLING TANZANIEN", code: "TZS", isLocale: 0 , cours:1}, 
    {  libelle: "DOLLAR DE TRINIDAD", code: "TTD", isLocale: 0 , cours:1}, 
    {  libelle: "LIVRE TURQUE", code: "TRY", isLocale: 0 , cours:1}, 
    {  libelle: "DINAR TUNISIEN", code: "TND", isLocale: 0 , cours:1}, 
    {  libelle: "LILANGENI DU SWAZILAND", code: "SZL", isLocale: 0 , cours:1},
    { libelle: "LIVRE SYRIENNE", code: "SYP", isLocale: 0 , cours:1},
    {  libelle: "LIVRE SUD-SOUDANAIS", code: "SSP", isLocale: 0 , cours:1}, 
    {  libelle: "LEONE SIERRA LEONAIS", code: "SLL", isLocale: 0 , cours:1}, 
    {  libelle: "DOLLAR DE SINGAPOUR", code: "SGD", isLocale: 0 , cours:1},
    {  libelle: "RIAL SAOUDIEN", code: "SAR", isLocale: 0 , cours:1}, 
    {  libelle: "FRANC RWANDAIS", code: "RWF", isLocale: 0 , cours:1}, 
    {  libelle: "ROUBLE RUSSE", code: "RUB", isLocale: 0 , cours:1}, 
    {  libelle: "RIYAL QATARIEN", code: "QAR", isLocale: 0 , cours:1}, 
    {  libelle: "PESO PHILIPPIN", code: "PHP", isLocale: 0 , cours:1}, 
    {  libelle: "RIAL OMANAIS", code: "OMR", isLocale: 0 , cours:1}, 
    {  libelle: "ROUPIE NEPALAISE", code: "NPR", isLocale: 0 , cours:1},
    {  libelle: "NAIRA NIGERIAN", code: "NGN", isLocale: 0 , cours:1},
    {  libelle: "METICAL MOZAMBICAIN", code: "MZN", isLocale: 0 , cours:1}, 
    {  libelle: "KWACHA MALAWIEN", code: "MWK", isLocale: 0 , cours:1}, 
    {  libelle: "RUFIYAA MALDIVIEN", code: "MVR", isLocale: 0 , cours:1},
    {  libelle: "ROUPIE MAURICIENNE", code: "MUR", isLocale: 0 , cours:1},
    {  libelle: "OUGUIYA MAURITANIEN (ANCIEN)", code: "MRO", isLocale: 0 , cours:1},
    {  libelle: "ARIARY MALGACHE", code: "MGA", isLocale: 0 , cours:1},
    {  libelle: "DIRHAM MAROCAIN", code: "MAD", isLocale: 0 , cours:1}, 
    {  libelle: "DINAR LIBYEN", code: "LYD", isLocale: 0 , cours:1},
    {  libelle: "ROUPIE SRI LANKAISE", code: "LKR", isLocale: 0 , cours:1}, 
    {  libelle: "LIVRE LIBANAIS", code: "LBP", isLocale: 0 , cours:1},
    {  libelle: "DINAR KOWEITIEN", code: "KWD", isLocale: 0 , cours:1},
    {  libelle: "SHILLING KENYAN", code: "KES", isLocale: 0 , cours:1},
    {  libelle: "YEN JAPONNAIS", code: "JPY", isLocale: 0 , cours:1}, 
    {  libelle: "DINAR JORDANIEN", code: "JOD", isLocale: 0 , cours:1}, 
    {  libelle: "ROUPIE INDIENNE", code: "INR", isLocale: 0 , cours:1},
    {  libelle: "ROUPIE INDONESIEN", code: "IDR", isLocale: 0 , cours:1},
    {  libelle: "FRANC GUINEEN", code: "GNF", isLocale: 0 , cours:1}, 
    {  libelle: "DALASI GAMBIEN", code: "GMD", isLocale: 0 , cours:1},
    {  libelle: "CEDI GHANEEN", code: "GHS", isLocale: 0 , cours:1}, 
    {  libelle: "LIVRE STERLING", code: "GBP", isLocale: 0 , cours:1}, 
    {  libelle: "EURO", code: "EURO", isLocale: 0 , cours:1}, 
    {  libelle: "BIRR ETHIOPIEN", code: "ETB", isLocale: 0 , cours:1},
    {  libelle: "LIVRE EGYPTIEN", code: "EGP", isLocale: 0 , cours:1}, 
    {  libelle: "DINAR ALGERIEN", code: "DZD", isLocale: 0 , cours:1}, 
    {  libelle: "YUAN CHINOIS", code: "CNY", isLocale: 0 , cours:1},
    {  libelle: "PULA DU BOTSWANA", code: "BWP", isLocale: 0 , cours:1},
    {  libelle: "NGULTRUM BHUTANAIS", code: "BTN", isLocale: 0 , cours:1}, 
    {  libelle: "BIRR ETHIOPIEN", code: "BIRR", isLocale: 0 , cours:1},
    {  libelle: "FRANC BURUNDAIS", code: "BIF", isLocale: 0 , cours:1}, 
    {  libelle: "DINAR DE BAREIN", code: "BHD", isLocale: 0 , cours:1},
    {  libelle: "TAKA BANGLADAIS", code: "BDT", isLocale: 0 , cours:1}, 
    {  libelle: "DIRHAM DES EMIRATS ARABES UNIS", code: "AED", isLocale: 0 , cours:1}, 
          
  ];
  console.log('🔄 La liste des devises ....');
  for (const deviseData of devisesData) {
    const existing = await deviseRepo.findOne({ where: { code: deviseData.code } });
    if (!existing) {
      await deviseRepo.save(deviseRepo.create(deviseData));
    }
  }


 

}
// //////////////////////////////////////////////////////
//   DOMAINE 
// //////////////////////////////////////////////////////
async function seedDomaineActivite(dataSource: DataSource): Promise<void>{
   const domaineActiviteRepo = dataSource.getRepository(DomaineActivite);
   
    // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const domaineActivitesData =  [
        {
            code: "19",
            libelle: "ENTREPRISE INDUSTRIELLE",
            description: "CONSTRUCTION ET REPARATION NAVALE ET DIVERSES ACTIVITES AVEC INTERVENTION EN OFFSHORE"
        },
        {
            code: "18",
            libelle: "GESTION ET TRAITEMENT DES RESIDUS MINIERS",
            description: "GESTION ET TRAITEMENT DES RESIDUS MINIERS"
        },
        {
            code: "17",
            libelle: "TRANSPORT",
            description: "TRANSPORT DE MARCHANDISES"
        },
        {
            code: "16",
            libelle: "STOCKAGE DE PRODUITS PÉTROLIERS ",
            description: "IMPORTATION, DISTRIBUTION ET STOCKAGE DE PRODUITS PÉTROLIERS "
        },
        {
            code: "15",
            libelle: "INDUSTRIE TEXTILE",
            description: "TRANSFORMATION DE TEXTILE"
        },
        {
            code: "14",
            libelle: "AGRO INDUSTRIE",
            description: "TRANSFORMATION DE MATIERES PREMIERES"
        },
        {
            code: "13",
            libelle: "INDUSTRIE DES CERAMIQUES ET DU VERRE",
            description: "FABRICATION D'OBJET EN CERAMIQUE, DE CARREAUX, DE VERRES..."
        },
        {
            code: "12",
            libelle: "MINES A CIEL OUVERT",
            description: "MINES A CIEL OUVERT"
        },
        {
            code: "11",
            libelle: "COSMÉTIQUES ET PARFUMERIES",
            description: "COMMERCE, DISTRIBUTION DE COSMÉTIQUES ET PARFUMERIE SANS PROCÉDÉS DE FABRICATION "
        },
        {
            code: "10",
            libelle: "QUINCAILLERIE",
            description: "OUTILLAGE,  QUINCAILLERIE DE BÂTIMENT ET D’AMEUBLEMENT, BOULONNERIE, VISSERIE, PRODUITS ET FOURNITURES DIVERS DE QUINCAILLERIE, ELEMENTS DE PLOMBERIE, SANITAIRE,…"
        },
        {
            code: "9",
            libelle: "CENTRES COMMERCIAUX",
            description: "SUPERMARCHES, MAGASINS, BOUTIQUES, COMMERCE DE GROS ET DETAIL"
        },
        {
            code: "8",
            libelle: "LABORATOIRE D'ANALYSE MEDICAL",
            description: "LABORATOIRE D'ANALYSE MEDICAL"
        },
        {
            code: "7",
            libelle: "CENTRES HOSPITALIERS ",
            description: "HPITAUX PRIVES ET PUBLICS"
        },
        {
            code: "6",
            libelle: "BUREAUX, LOCAUX PROFESSIONNELS",
            description: "BATIMENT BUREAUX ORDINAIRE A ACTIVITES CLASSIQUE SANS EXPLOITATION INDUCTRIELLE"
        },
        {
            code: "5",
            libelle: "ETABLISSEMENT BANCAIRE",
            description: "BANQUE, MICRO FINANCE"
        },
        {
            code: "4",
            libelle: "CONCEPTION ET FABRICATION DES SYSTÈMES ET ÉQUIPEMENTS PÉTROLIERS ET GAZIERS.",
            description: "CONCEPTION ET FABRICATION DES SYSTÈMES ET ÉQUIPEMENTS PÉTROLIERS ET GAZIERS."
        },
        {
            code: "3",
            libelle: "HOTELLERIE",
            description: "HÔTEL, BUREAUX, MAGASINS, APPPARTEMENTS"
        },
        {
            code: "1",
            libelle: "RAFFINERIE",
            description: "INSTALLATION INDUSTRIELLE SPÉCIALISÉE DANS LA TRANSFORMATION ET LA PURIFICATION DE MATIÈRES PREMIÈRES POUR OBTENIR DES PRODUITS FINIS"
        }
    ]
    console.log('🔄 La liste des devises ....');
  for (const domaineActiviteData of domaineActivitesData) {
    const existing = await domaineActiviteRepo.findOne({ where: { code: domaineActiviteData.code } });
    if (!existing) {
      await domaineActiviteRepo.save(domaineActiviteRepo.create(domaineActiviteData));
    }
  }
}
// //////////////////////////////////////////////////////
//   MOUVEMENT 
// //////////////////////////////////////////////////////
async function seedMouvement(dataSource: DataSource): Promise<void>{
   const mouvementRepo = dataSource.getRepository(Mouvement);
   
    // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const mouvementsData =  [
        { code: "AFN",      libelle: "AFFAIRE NOUVELLE"},
        { code: "MOD",      libelle: "MODIFICATION"},
        { code: "ANL",      libelle: "ANNULATION"},
    ]
    console.log('🔄 La liste des mouvements ....');
  for (const mouvementData of mouvementsData) {
    const existing = await mouvementRepo.findOne({ where: { code: mouvementData.code } });
    if (!existing) {
      await mouvementRepo.save(mouvementRepo.create(mouvementData));
    }
  }
}
// //////////////////////////////////////////////////////
//   NATURE CESSION 
// //////////////////////////////////////////////////////
async function seedNatureCession(dataSource: DataSource): Promise<void>{
   const natureCessionRepo = dataSource.getRepository(NatureCession);
   
    // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
    //Légale, Conventionnelle, Facultative
  const natureCessionsData =  [
        { code: "LEG",      libelle: "LEGALE"},
        { code: "CON",      libelle: "CONVENTIONNELLE"},
        { code: "FAC",      libelle: "FACULTATIVE"},
    ]
    console.log('🔄 La liste des natures cessions ....');
  for (const natureCessionData of natureCessionsData) {
    const existing = await natureCessionRepo.findOne({ where: { code: natureCessionData.code } });
    if (!existing) {
      await natureCessionRepo.save(natureCessionRepo.create(natureCessionData));
    }
  }
}
// //////////////////////////////////////////////////////
//   NATURE OFFRE 
// //////////////////////////////////////////////////////
async function seedNatureOffre(dataSource: DataSource): Promise<void>{
   const natureOffreRepo = dataSource.getRepository(NatureOffre);
   
    // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const natureOffresData : Partial<NatureOffre>[] =  [
         {  libelle: "FACULTATIVE PURE",
            code: "FAC PURE",
            isFacultative: true,
            isProportionnelle: true
        },
        { 
            libelle: "FACULTATIVE EXCESS",
            code: "FAC XS",
            isFacultative: true,
            isProportionnelle: false,
            isXs: true
        },
        {
            libelle: "EXCEDENT DE PLEIN",
            code: "EDP",
            isFacultative: false,
            isProportionnelle: true,
            isEdp: true
        },
        {
            libelle: "FACULTATIVE OBLIGATOIRE",
            code: "FACOB",
            isFacultative: true,
            isFacObligatoire: true,
            isProportionnelle: true
        },
        { 
            libelle: "QUOTE PART",
            code: "QP",
            isQuotePart: true,
            isFacultative: false,
            isProportionnelle: true
        },
        {
            libelle: "EXCESS AGGREGATE",
            code: "XS AGGREGATE",
            isFacultative: false,
            isProportionnelle: false,
            isXs: true
        },
        {
            libelle: "EXCEDENT DE SINISTRE PAR EVENEMENT",
            code: "XS\/EVENEMENT",
            isFacultative: false,
            isXs: true,
            isProportionnelle: false
        },
        {
            libelle: "EXCEDENT DE PERTE ANNUELLE",
            code: "XS\/PERTE ANNUELLE",
            isXs: true,
            isFacultative: false,
            isProportionnelle: false
        },
        {
            libelle: "EXCEDENT DE SINISTRE PAR RISQUE",
            code: "XS\/RISQUE",
            isXs: true,
            isFacultative: false,
            isProportionnelle: false
        },
        {
            libelle: "EXCEDENT DE SINISTRE PAR RISQUE ET PAR EVENEMENT",
            code: "XS\/RISQUE ET EVENEMENT",
            isXs: true,
            isFacultative: false,
            isProportionnelle: false
        }
    ]
    console.log('🔄 La liste des natures offres ....');
  for (const natureOffreData of natureOffresData) {
    const existing = await natureOffreRepo.findOne({ where: { code: natureOffreData.code } });
    if (!existing) {
      await natureOffreRepo.save(natureOffreRepo.create(natureOffreData));
    }
  }
}



