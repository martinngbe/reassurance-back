import { DataSource } from 'typeorm';
import { Police } from '../entities/police.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';

export async function seedPoliceQuittance(dataSource: DataSource): Promise<void> {
   
   await seedPolice(dataSource);
   await seedQuittance(dataSource)
  console.log('✅ Referentiel seed seedPoliceQuittance avec succès (Idempotent)');
}

// //////////////////////////////////////////////////////
//   POLICE 
// //////////////////////////////////////////////////////
  async function seedPolice(dataSource: DataSource): Promise<void>{
  const policeRepo = dataSource.getRepository(Police); 
  console.log('🔄 Vérification des données Assurés ...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const policesData = [
              {
                numero: "P001",
                assureId: entierEntre(1,7),
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: false,
                acteurCedanteId: 1,

              },
              {
                numero: "P002",
                assureId: entierEntre(1,7),
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: false,
                acteurCedanteId: 1
              },
              {
                numero: "P003",
                assureId: entierEntre(1,7),
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: false,
                acteurCedanteId: 2          
              },
              {
                numero: "P004",
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: true,
                acteurCedanteId: 2 
              },
              {
                numero: "P005",
                assureId: entierEntre(1,7),
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: false,
                acteurCedanteId: 3
              },
              {
                numero: "P006",
                assureId: entierEntre(1,7),
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: false,
                acteurCedanteId: 3
              },
              {
                numero: "P007",
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: true,
                acteurCedanteId: 4
              },
              {
                numero: "P008",
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: true,
                acteurCedanteId: 4                
              },
              {
                numero: "P009",
                sousBrancheId: entierEntre(1,30),
                natureOffreId: entierEntre(1,10),
                isIard: true ,
                isCession: true,
                acteurCedanteId: 5                
              }
            ];
  console.log('🔄 La liste des polices ....');
  for (const assureData of policesData) {
    const existing = await policeRepo.findOne({ where: { numero: assureData.numero } });
    if (!existing) {
      await policeRepo.save(policeRepo.create(assureData));
    }
  }
}  
// //////////////////////////////////////////////////////
//   QUITTANCE 
// //////////////////////////////////////////////////////
 async  function seedQuittance(dataSource: DataSource): Promise<void>{
  const quittanceRepo = dataSource.getRepository(Quittance); 
  console.log('🔄 Vérification des données du referentiel...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const quittancesData =[
  {
    tauxCedante: 100,
    tauxAccepte: 70,
    commissionFixe: 32.5,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 120,
    numero: "MAF-26-000001",
    dateEffet: "2026-10-28",
    dateEcheance: "2027-10-27",
    capitaux: 20000000000,
    lci: 20000000000,
    smp: 20000000000,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId : entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 25000000,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 74.68,
    commissionFixe: 27.5,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 90,
    numero: "MAF-26-000002",
    dateEffet: "2026-05-01",
    dateEcheance: "2026-09-30",
    capitaux: 48425858130,
    lci: 0,
    smp: 35715757250,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId : entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 42827614,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 41.84,
    commissionFixe: 0,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 90,
    numero: "MAF-26-000003",
    dateEffet: "2026-07-01",
    dateEcheance: "2027-06-30",
    capitaux: 105444896861,
    lci: 0,
    smp: 86790128521,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId : entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 95292505,
    tauxCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 86.25,
    commissionFixe: 27.5,
    taxeSurCommissionFixe: 0,
    avisEcheance: 90,
    numero: "MAF-26-000004",
    dateEffet: "2026-05-01",
    dateEcheance: "2027-04-30",
    capitaux: 135473332492,
    lci: 104342944416,
    smp: 104342944416,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId : entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 200659656,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 73,
    commissionFixe: 26.5,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 0,
    numero: "MAF-26-000005",
    dateEffet: "2026-08-19",
    capitaux: 34892231249,
    lci: 34892231249,
    smp: 34892231249,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId : entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 610614047,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 10,
    commissionFixe: 32.5,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 90,
    numero: "MAF-26-000006",
    dateEffet: "2026-03-01",
    dateEcheance: "2027-02-28",
    capitaux: 13506925051,
    lci: 13506925051,
    smp: 13506925051,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId: entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 42373172,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 80,
    tauxAccepte: 10,
    commissionFixe: 32.5,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 90,
    numero: "MAF-26-000007",
    dateEffet: "2026-03-01",
    dateEcheance: "2027-02-28",
    capitaux: 13506925051,
    lci: 0,
    smp: 13506925051,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId:entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 42373172,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 87.97,
    commissionFixe: 0,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 0,
    numero: "MAF-26-000008",
    dateEffet: "2026-08-01",
    dateEcheance: "2027-07-31",
    capitaux: 800000000,
    lci: 0,
    smp: 800000000,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId: entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 1500000,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 87.975,
    commissionFixe: 25,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 0,
    numero: "MAF-26-000009",
    dateEffet: "2026-08-01",
    dateEcheance: "2027-07-31",
    capitaux: 800000000,
    lci: 0,
    smp: 0,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId: entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 1500000,
    tauxCommission: 0,
    taxeSurCommission: 0
  },
  {
    tauxCedante: 100,
    tauxAccepte: 87.975,
    commissionFixe: 25,
    taxeSurCommissionFixe: 0,
    coursDevise: decimalEntre(1 , 655),
    avisEcheance: 0,
    numero: "MAF-26-000010",
    dateEffet: "2026-08-01",
    dateEcheance: "2027-07-31",
    capitaux: 800000000,
    lci: 0,
    smp: 0,
    limite: 0,
    retention: 0,
    conservation: 0,
    estimationPrime: 0,
    nombreEcheancePmd: 0,
    sinistreAuComptant: 0,
    avisSinistre: 0,
    aliment: 0,
    mouvementId:1,
    policeId: entierEntre(1 ,9),
    deviseId: entierEntre(1 ,50),
    nombrePlein: 0,
    tauxRetention: 0,
    taxeSurPrime: 0,
    primeBrute: 1500000,
    tauxCommission: 0,
    taxeSurCommission: 0
  }
];
    console.log('🔄 La liste des quittances ....');
    let doublon = ""
    for (const quittanceData of quittancesData) {
        const existing = await quittanceRepo.findOne({ where: { numero: quittanceData.numero } });
        if (!existing) {
            await quittanceRepo.save(quittanceRepo.create(quittanceData));
        }else {
          console.log("Doublon quittance N°",quittanceData.numero )
        }
    }

 


}


function entierEntre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function decimalEntre(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}