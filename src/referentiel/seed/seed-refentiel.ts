import { DataSource } from 'typeorm';
import { Branche } from '../entities/branche.entity';
import { SousBranche } from '../entities/sous-branche.entity';
import { Region } from '../entities/region.entity';
import { Pays } from '../entities/pays.entity';

export async function seedReferentiel(dataSource: DataSource): Promise<void> {
  const brancheRepo = dataSource.getRepository(Branche);
  const sousBrancheRepo = dataSource.getRepository(SousBranche);
  const regionRepo = dataSource.getRepository(Region);
   const paysRepo = dataSource.getRepository(Pays);

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



    // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const regionsData = [
        {code:'AF',libelle:'Afrique'},
        {code:'EU',libelle:'Europe'},
        {code:'AS',libelle:'Asie'},
        {code:'AM',libelle:'Amérique'},
       
  ];
  console.log('🔄 La liste des regions ....');
  for (const regionData of regionsData) {
    const existing = await regionRepo.findOne({ where: { code: regionData.code } });
    if (!existing) {
      await regionRepo.save(regionRepo.create(regionData));
    }
  }
console.log('🔄 La liste des pays ....')
   const listePaysData = [
    /// AFRIQUE
    {indicatif:'225' ,  code:'CI',libelle:"Côte d'Ivoire",regionId:1},
    {indicatif:'226' ,  code:'BF',libelle:"Burkina Faso",regionId:1},    
    {indicatif:'20' ,   code:'CI',libelle:"Egypte",regionId:1},
    {indicatif:'212' ,  code:'CI',libelle:"Maroc",regionId:1},
    {indicatif:'213' ,  code:'CI',libelle:"Algérie",regionId:1},
    {indicatif:'216' ,  code:'CI',libelle:"Tunisie",regionId:1},
    {indicatif:'218' ,  code:'CI',libelle:"Libye",regionId:1},
    {indicatif:'220' ,  code:'CI',libelle:"Gambie",regionId:1},
    {indicatif:'221' ,  code:'CI',libelle:"Sénégal",regionId:1},
    {indicatif:'222' ,  code:'CI',libelle:"Mauritanie",regionId:1},
    {indicatif:'223' ,  code:'CI',libelle:"Mali",regionId:1},
    {indicatif:'224' ,  code:'CI',libelle:"Guinée",regionId:1},
    {indicatif:'225' ,  code:'CI',libelle:"Côte d'Ivoire",regionId:1},
    {indicatif:'226' ,  code:'CI',libelle:"Burkina Faso",regionId:1},
    {indicatif:'227' ,  code:'CI',libelle:"Niger",regionId:1},
    {indicatif:'228' ,  code:'CI',libelle:"Togo",regionId:1},
    {indicatif:'229' ,  code:'CI',libelle:"Bénin",regionId:1},
    {indicatif:'230' ,  code:'CI',libelle:"Maurice",regionId:1},
    {indicatif:'231' ,  code:'CI',libelle:"Liberia",regionId:1},
    {indicatif:'232' ,  code:'CI',libelle:"Sierra-Leone",regionId:1},
      ////// EUROPE    
    {indicatif:'30' ,  code:'CI',libelle:"Grèce",regionId:2},
    {indicatif:'31' ,  code:'CI',libelle:"Pays-Bas",regionId:2},
    {indicatif:'32' ,  code:'CI',libelle:"Belgique",regionId:2},
    {indicatif:'34' ,  code:'CI',libelle:"Espagne",regionId:2},
    {indicatif:'34928' ,  code:'CI',libelle:"Iles Canaries",regionId:2},
    {indicatif:'350' ,  code:'CI',libelle:"Gibraltar",regionId:2},
    {indicatif:'351' ,  code:'CI',libelle:"Portugal",regionId:2},
    {indicatif:'351' ,  code:'CI',libelle:"Açores",regionId:2},
    {indicatif:'352' ,  code:'CI',libelle:"Luxembourg",regionId:2},
    {indicatif:'353' ,  code:'CI',libelle:"Irlande",regionId:2},
    {indicatif:'354' ,  code:'CI',libelle:"Islande",regionId:2},
    
  ];

  for (const paysData of listePaysData) {
    const existing = await paysRepo.findOne({ where: { code: paysData.code } });
    if (!existing) {
     // console.log(paysData)
      await paysRepo.save(paysRepo.create(paysData));
    }
  }


  console.log('✅ Referentiel seed terminé avec succès (Idempotent)');
}

