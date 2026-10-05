import { DataSource } from 'typeorm';
import { Branche } from '../entities/branche.entity';
import { SousBranche } from '../entities/sous-branche.entity';

export async function seedReferentiel(dataSource: DataSource): Promise<void> {
  const brancheRepo = dataSource.getRepository(Branche);
  const sousBrancheRepo = dataSource.getRepository(SousBranche);

  console.log('🔄 Vérification des données d\'authentification...');

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
    const existing = await brancheRepo.findOne({ where: { code: sousBrancheData.code } });
    if (!existing) {
      await brancheRepo.save(brancheRepo.create(sousBrancheData));
    }
  }




  console.log('✅ Auth seed terminé avec succès (Idempotent)');
}

