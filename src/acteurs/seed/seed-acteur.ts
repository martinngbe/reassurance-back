import { DataSource } from 'typeorm';
import { Assure } from '../entities/assure.entity';
import { Acteur } from '../entities/acteur.entity';


// //////////////////////////////////////////////////////
//   ASSURE 
// //////////////////////////////////////////////////////
 export async function seedAssure(dataSource: DataSource): Promise<void>{
  const assureRepo = dataSource.getRepository(Assure); 
  console.log('🔄 Vérification des données Assurés ...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const assuresData = [
        {            
            numero: "COD-26-000003",
            raisonSociale: "SOCIETE SENIG",
            sigle: "SOCIETE SENIG",
            adresse: "AVENUE DU PORT, BP 2118, BRAZZAVILLE, RÉPUBLIQUE DU CONGO",
            localite: "BRAZZAVILLE",
            quartier: "OUENZE",
            rue: "AVENUE DU PORT",
            description: "CONSTRUCTION ET RÉPARATION NAVALE ET DIVERSES ACTIVITÉS AVEC INTERVENTION EN OFFSHORE",
            telephone: "+242 06 668 83 83",
            paysId: 162,
            domaineAtivite_id: 19,
        },
        { 
            numero: "SEN-26-000003",
            raisonSociale: "PARAGON TAILINGS SENEGAL",
            sigle: "PARAGON",
            adresse: "DAKAR",
            localite: "DAKAR",
            quartier: "PLATEAU",
            rue: "RUE DE L'INDEPENDANCE",
            description: "ENTREPRISE SUD AFRICAINE DE GESTION ET DE TRAITEMENT DES DECHETS MINIERS",
            telephone: "",           
            paysId: 12,
            domaineAtivite_id: 18,           
        },
        { 
            numero: "SEN-26-000001",
            raisonSociale: "INDUSTRIE CHIMIQUE DU SENEGAL",
            sigle: "ICS",
            adresse: "MERMOZ, PYROTECHNIE N°75 A \nB.P. 50225 DAKAR ",
            localite: "RUFISQUE",
            quartier: "RUFISQUE",
            rue: "GRABD MBAO – CITÉ SDE VILLA N°39  2E ÉTAGE DAKAR - SÉNÉGAL",
            description: "TRANSPORT DE SOUFRE EN VRAC.",
            telephone: "TBA",            
            paysId: 12,
            domaineAtivite_id: 17,           
        },
        {
            numero: "GMB-26-000001",
            raisonSociale: "GAM PETROLEUM",
            sigle: "",
            adresse: "TBA",
            localite: "BANJUL",
            quartier: "TBA",
            rue: "",
            description: "IMPORTATION, DISTRIBUTION ET STOCKAGE DE PRODUITS PÉTROLIERS AINSI QUE TOUTES ACTIVITÉS CONNEXES OU ANNEXES.",
            telephone: "",
            paysId: 11,
            domaineAtivite_id: 16,
        },
        {
            numero: "BEN-26-000001",
            raisonSociale: "BENIN TEXTILE CORPORATION",
            sigle: "BTC",
            adresse: "TBA",
            localite: "COTONOU",
            quartier: "COTONOU",
            rue: "TBA",
            description: "USINE DE TRANSFORMATION DE TEXTILE",
            telephone: "TBA",
            paysId: 19,
            domaineAtivite_id: 15,
        },
        {
            numero: "CIV-26-000003",
            raisonSociale: "TRANSCAO CI",
            sigle: "TRANSCAO CI",
            adresse: "01 BP 2071 ABIDJAN 01",
            localite: "ATTINGUIE",
            quartier: "PK 24",
            rue: "TBA",
            description: "TRANSFORMATION INDUSTRIELLE DE CACAO, CAFÉ EN PRODUITS FINIS OU SEMI-FINIS",
            telephone: "2720312927",
            paysId: 1,
            domaineAtivite_id: 14,
        },
        {           
            numero: "COG-26-000002",
            raisonSociale: "WEATHERFORD SERVICES LTD",
            sigle: "",
            adresse: "PARCELLE 212 SECTION C\nQUARTIER DE LA FOIRE POINTE-NOIRE",
            localite: "POINTE NOIRE",
            quartier: "QUARTIER DE LA FOIRE",
            rue: "PARCELLE 212 SECTION C QUARTIER DE LA FOIRE POINTE-NOIRE",
            description: "SOCIÉTÉ INTERNATIONALE. AFFAIRE APPORTÉE PAR AIG",
            telephone: "",          
            paysId: 30,
            domaineAtivite_id: 4,
            
        },{
            numero: "COD-26-000001",
            raisonSociale: "TOURS JUMELLES DE BRAZZAVILLE",
            sigle: "TJB",
            adresse: "LES TOURS JUMELLES DE MPILA,BRAZZAVILLE 00000 REPUBLIC DU CONGO",
            localite: "BRAZZAVILLE",
            quartier: "MPILA",
            rue: "FLEUVE DU CONGO",
            description: "HOTELS ET RESIDENCES",
            telephone: "+242067830000",          
            paysId: 162,
            domaineAtivite_id: 3,          
        },
        {
            numero: "CIV-26-000001",
            raisonSociale: "SOCIETE IVOIRIENNE DE RAFFINERIE",
            sigle: "SIR",
            adresse: "01 BP 1269 ABIDJAN 01",
            localite: "ABIDJAN",
            quartier: "VRIDI",
            rue: "VRIDI",
            description: "STOCKAGE PÉTROLIER",
            telephone: "+225 27 21 23 70 70",           
            paysId: 1,
            domaineAtivite_id: 1,
            
        }
    ];
  console.log('🔄 La liste des assures ....');
  for (const assureData of assuresData) {
    const existingActeure = await assureRepo.findOne({ where: { sigle: assureData.sigle } });
    if (!existingActeure) {
      await assureRepo.save(assureRepo.create(assureData));
    }
  }
}  
// //////////////////////////////////////////////////////
//   ACTEUR 
// //////////////////////////////////////////////////////
export async  function seedActeur(dataSource: DataSource): Promise<void>{
  const acteurRepo = dataSource.getRepository(Acteur); 
  console.log('🔄 Vérification des données du referentiel...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const acteursData = [
  {
    "isCourtier": true,
    "raisonSociale": "<AUCUN>",
    "sigle": "AUCUN",
    "adresse": "AUCUNE",
    "telephone": "AUCUN",
    "email": "AUCUN",
    "siteweb": "AUCUN",
    "coordonneesBancaire": "AUCUN",
    "paysId": 1,
  },
  {
    "isCourtier": true,
    "raisonSociale": "West African Insurance and Reinsurance Brokers",
    "sigle": "WAIRB",
    "adresse": "AUCUNE",
    "telephone": "AUCUN",
    "email": "AUCUN",
    "siteweb": "AUCUN",
    "coordonneesBancaire": "AUCUN",
    "paysId": 1,
  },
    {
    "isCourtier": true,
    "raisonSociale": "SCA Inter A Ltd Reinsurance Brokers",
    "sigle": "SCA INTER A",
    "adresse": "AUCUNE",
    "telephone": "AUCUN",
    "email": "AUCUN",
    "siteweb": "AUCUN",
    "coordonneesBancaire": "AUCUN",
    "paysId": 1,
  },  
  {
    "isReassureur": true,
    "raisonSociale": "AFRICA RE",
    "sigle": "AFRICA RE",
    "adresse": "COCODY",
    "telephone": "+ 225 22 40 44 80",
    "email": "www.africa-re.com",
    "siteweb": "www.africa-re.com",
    "coordonneesBancaire": "CI006 01550 021885470001 75",
    "paysId": 1,
  },
  {
    "isReassureur": true,
    "raisonSociale": "CICA RE LOME",
    "sigle": "CICA RE LOME",
    "adresse": "07 BP 12410, CITÉ OUA LOMÉ 2, LOMÉ - TOGO",
    "telephone": "+22822236262",
    "email": "cica-re@cica-re.com",
    "coordonneesBancaire": "10035 01100 70004734011 20",
    "paysId": 2,
  },
  {
    "isReassureur": true,
    "raisonSociale": "CONTINENTAL RE",
    "sigle": "CONTINENTAL RE",
    "adresse": "4E ÉTAGE, IMM. CONTINENTAL RE, ANGLE DE LA RUE PIERRE & MARIE CURIE & DE LA RUE DOCTEUR CALMETTE , ZONE 4 C MARCORY",
    "telephone": "+225 27 21 59 84 90",
    "email": "akoua@continental-re.com",
    "siteweb": "www.continental-re.com",    
    "coordonneesBancaire": "CI150 01001 101090001325 37",
    "paysId": 1,
  },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES BENIN",
    "sigle": "NSIA BEN",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 19,
   },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES CAMEROUN",
    "sigle": "NSIA CAM",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 26,
  },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES CONGO",
    "sigle": "NSIA RDC",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 30,
  },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES COTE D'IVOIRE",
    "sigle": "NSIA CIV",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    },
  {    
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES GABON",
    "sigle": "NSIA GAB",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "paysId": 29,
  },
  {    
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES GUINEE",
    "sigle": "NSIA GUI",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 15,
   },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES GUINEE BISSAU( VIE & NON VIE)",
    "sigle": "NSIA BIS",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 17,
   },
  {    
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES MALI",
    "sigle": "NSIA MAL",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 14,
  },
  {  
    "isCompagnieAssurance":true, 
    "raisonSociale": "NSIA ASSURANCES SENEGAL",
    "sigle": "NSIA SEN",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 12,
  },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES TOGO",
    "sigle": "NSIA TGO",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 15,
  },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES VIE CAMEROUN",
    "sigle": "NSIA VIE CAM",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 26,
   },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES VIE CONGO",
    "sigle": "NSIA VIE RDC",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 30,
   },
  { 
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES VIE COTE D'IVOIRE",
    "sigle": "NSIA VIE CI",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
  },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES VIE GABON",
    "sigle": "NSIA VIE GAB",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 29,
  },
  {
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES VIE GUINEE",
    "sigle": "NSIA VIE GUI",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 15,
   },
  {    
    "isCompagnieAssurance":true,
    "raisonSociale": "NSIA ASSURANCES VIE MALI",
    "sigle": "NSIA VIE MAL",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 14,
   },
  {   
    "isCompagnieAssurance":true, 
    "raisonSociale": "NSIA ASSURANCES VIE SENEGAL",
    "sigle": "NSIA VIE SEN",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 12,
   },
  {  
    "isCompagnieAssurance":true,  
    "raisonSociale": "NSIA ASSURANCES VIE TOGO",
    "sigle": "NSIA VIE TGO",
    "adresse": "VOIR DOCUMENT",
    "telephone": "",
    "email": "",
    "coordonneesBancaire": "VOIR DOCUMENT",
    "paysId": 15,
  },
  {   
    "isCompagnieAssurance":true, 
    "raisonSociale": "WAICA RE",
    "sigle": "WAICA RE",
    "adresse": "4A ALSHEK CRESCEN HILL STATION FREETOWN, WESTERN AREA, SIERRA LEONNE",
    "telephone": "+225 27 20 22 56 74",   
    "email": "info@waicare.com",     
    "coordonneesBancaire": "CI93 CI05 9010 0112 0316 9980 0158",
    "paysId": 24,
  }
];
    console.log('🔄 La liste des acteurs ....');
    for (const acteurData of acteursData) {
    const existingActeure = await acteurRepo.findOne({ where: { sigle: acteurData.sigle } });
    if (!existingActeure) {
        await acteurRepo.save(acteurRepo.create(acteurData));
    }
    }

 


}