import { DataSource } from 'typeorm';
import { Police } from '../entities/police.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';

export async function seedPoliceRetroCessionQuittance(dataSource: DataSource): Promise<void> {
   
   await seedPoliceRetroCessionTRaite(dataSource);
  console.log('✅ Referentiel seed seedPoliceQuittance avec succès (Idempotent)');
}

// //////////////////////////////////////////////////////
//   POLICE CESSION 
// //////////////////////////////////////////////////////
async function seedPoliceRetroCessionTRaite(dataSource: DataSource): Promise<void>{
  const policeRepo = dataSource.getRepository(Police); 
  console.log('🔄 Vérification des polices retro cession tratité  ...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const policesCessionTRaiteData = [
  {
    "numero": "PRT-26-000017",
    "natureOffreId": 2 ,
     //sousBrancheId: 3
  },
  {
    "numero": "PRT-26-000016",
    "natureOffreId": 2 ,
    sousBrancheId: 2
  },
  {
    "numero": "PRT-26-000015",
    "natureOffreId": 2,
    isCession: true,
    sousBrancheId: 6
  },
  {
    "numero": "PRT-26-000014",
    "natureOffreId": 2,
    isCession: true,
    sousBrancheId: 3
  },
  {
    "numero": "PRT-26-000013",
    "natureOffreId": 2,
    isCession: true,
    sousBrancheId: 3
  },
  {
    "numero": "PRT-26-000012",
    "natureOffreId": 2,
    isCession: true,
    sousBrancheId: 3
  },
  {
    "numero": "PRT-26-000011",
    "natureOffreId": 2,
    isCession: true,
     sousBrancheId: 2
  },
  {
    "numero": "PRT-26-000010",
    isCession: true,
    "natureOffreId": 2
  },
  {
    "numero": "PRT-26-000009",
    isCession: true,
    "natureOffreId": 2
  },
  {
    "numero": "PRT-26-000008",
    "natureOffreId": 2,
  },
  {
    "numero": "PRT-26-000007",
    isCession: true,
    "natureOffreId": 2
  },
  {
    "numero": "PRT-26-000006",
    isCession: true,
    "natureOffreId": 2
  },
  {
    "numero": "PRT-26-000005",
    isCession: true,
    "natureOffreId": 2
  },
  {
    "numero": "PRT-26-000004",
    isCession: true,
    "natureOffreId": 2
  },
  {
    "numero": "PRT-26-000003",
    isCession: true,
    "natureOffreId": 2
  },
  {
    "numero": "PRT-26-000002",
    "natureOffreId": 2,
    isCession: true,
  },
  {
    "numero": "PRT-26-000001",
    "natureOffreId": 2 ,
    isCession: true,
  }
];
  console.log('🔄 La liste des polices retro cession traité ....');
  const quittanceRepo = dataSource.getRepository(Quittance); 
  let compteurPolice =0
  for (const policeData of policesCessionTRaiteData) {
          const existing = await policeRepo.findOne({ where: { numero: policeData.numero } });
          if (!existing) {
                policeData.isCession=true
            
                const sousBrancheId = entierEntre(33,42) // les sousBranche de la Retro commence à 33. Il y a 10
                // enregistreùe,t de la police
                policeData.sousBrancheId= entierEntre(1,10) 
                const policeSave = await policeRepo.save(
                  policeRepo.create({...policeData , 
                    sousBrancheId , 
                    acteurCedanteId:2 ,// isNous
                    acteurCourtierId:3 // GUY CARPENTIER
                  }));
                // //////////////////////////////////////////////
                // lecture de la quittance de la police à l'index :compteurPolice
                // //////////////////////////////////////////////
                let quittanceRead = getQuittanceCessionTRaite(compteurPolice)
                const existing2 = await quittanceRepo.findOne({ where: { numero: quittanceRead.numero } });
                if (!existing2) {
                   const policeId = policeSave.id 
                   quittanceRead.deviseId=14
                   
                  await quittanceRepo.save(quittanceRepo.create({...quittanceRead ,
                        policeId,
                        mouvementId:1 }));
                } else {
                  console.log("Police N°",policeData.numero )
                  console.log("Doublon quittance N°",quittanceRead.numero )
                }
                compteurPolice += 1
          }else {
            console.log("Doublon Police N°",policeData.numero)
          }
  }
 
}  
// //////////////////////////////////////////////////////
//   QUITTANCE CESSION
// //////////////////////////////////////////////////////
  function getQuittanceCessionTRaite( indexQuittance : number){
        const quittancesData =[
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000017",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 1000000000,
    "conservation": 0,
    "estimationprimeBrute": 1911124991,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 100,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 24366843.64,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000016",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 1000000000,
    "conservation": 0,
    "estimationprimeBrute": 10693799076,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 99,
    "deviseId": 73,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 136345938.22,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000015",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 1000000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 98,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 55005912.06,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000014",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-01",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 1911124991,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 97,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 26297079.876,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000013",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 1911124991,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 96,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 30577999.856,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000012",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 1911124991,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 95,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 44338099.791,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000011",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 10693799076,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 94,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 25665117.782,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000010",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 10693799076,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 93,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 42775196.304,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000009",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 10693799076,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 92,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 106937990.76,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000008",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 91,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 27502956.029,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000007",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-01",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 90,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 62340033.665,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000006",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 89,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 289697803.504,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000005",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 500000000,
    "retention": 11500000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 88,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 374040201.993,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000004",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 10000000000,
    "retention": 2000000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 87,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 27502956,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000003",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 5000000000,
    "retention": 5000000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 86,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 62340034,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000002",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 2500000000,
    "retention": 2500000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 85,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 289697804,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  },
  {
    "partCedante": 100,
    "partAcceptee": 100,
    "commissionFixe": 0,
    "taxeSurCommissionFixe": 0,
    "coursDevise": 1,
    "avisEcheance": 0,
    "numero": "MRT-26-000001",
    "dateEffet": "2026-01-01",
    "dateEcheance": "2026-12-31",
    "limite": 2000000000,
    "retention": 500000000,
    "conservation": 0,
    "estimationprimeBrute": 4314189181,
    "nombreEcheancePmd": 4,
    "avisSinistre": 375000000,
    "aliment": 0,
    "policeId": 84,
    "deviseId": 60,
    "nombrePlein": 0,
    "tauxRetention": 0,
    "primeBrute": 374040202,
    "taxeSurPrime": 0,
    "tauxCommission": 10,
    "taxeSurCommission": 0
  }
];
  return quittancesData[indexQuittance]
}



function entierEntre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function decimalEntre(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}