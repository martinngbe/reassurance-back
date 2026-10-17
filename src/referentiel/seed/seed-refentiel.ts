import { DataSource } from 'typeorm';
import { Branche } from '../entities/branche.entity';
import { SousBranche } from '../entities/sous-branche.entity';
import { Region } from '../entities/region.entity';
import { Pays } from '../entities/pays.entity';
import { Devise } from '../entities/devise.entity';
import { DomaineActivite } from '../entities/domaine-activite.entity';

export async function seedReferentiel(dataSource: DataSource): Promise<void> {
   const regionRepo = dataSource.getRepository(Region);
   const paysRepo = dataSource.getRepository(Pays);

   await seedBranche(dataSource);
   await seedBranche(dataSource);
   await seedDevise(dataSource)
   await seedDomaineActivite(dataSource)
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
    {indicatif:'20' ,   code:'EG',libelle:"Egypte",regionId:1},
    {indicatif:'212' ,  code:'MA',libelle:"Maroc",regionId:1},
    {indicatif:'213' ,  code:'AL',libelle:"Algérie",regionId:1},
    {indicatif:'216' ,  code:'TU',libelle:"Tunisie",regionId:1},
    {indicatif:'218' ,  code:'LB',libelle:"Libye",regionId:1},
    {indicatif:'220' ,  code:'GA',libelle:"Gambie",regionId:1},
    {indicatif:'221' ,  code:'SN',libelle:"Sénégal",regionId:1},
    {indicatif:'222' ,  code:'MR',libelle:"Mauritanie",regionId:1},
    {indicatif:'223' ,  code:'ML',libelle:"Mali",regionId:1},
    {indicatif:'224' ,  code:'GN',libelle:"Guinée",regionId:1},

    {indicatif:'227' ,  code:'NG',libelle:"Niger",regionId:1},
    {indicatif:'228' ,  code:'TG',libelle:"Togo",regionId:1},
    {indicatif:'229' ,  code:'BN',libelle:"Bénin",regionId:1},
    {indicatif:'230' ,  code:'MU',libelle:"Maurice",regionId:1},
    {indicatif:'231' ,  code:'LR',libelle:"Liberia",regionId:1},
    {indicatif:'232' ,  code:'SL',libelle:"Sierra-Leone",regionId:1},
      ////// EUROPE    
    {indicatif:'30' ,  code:'GR',libelle:"Grèce",regionId:2},
    {indicatif:'31' ,  code:'NL',libelle:"Pays-Bas",regionId:2},
    {indicatif:'32' ,  code:'BE',libelle:"Belgique",regionId:2},
    {indicatif:'34' ,  code:'SP',libelle:"Espagne",regionId:2},
    {indicatif:'350' ,  code:'GI',libelle:"Gibraltar",regionId:2},
    {indicatif:'351' ,  code:'PG',libelle:"Portugal",regionId:2},
    {indicatif:'351' ,  code:'AC',libelle:"Açores",regionId:2},
    {indicatif:'352' ,  code:'LX',libelle:"Luxembourg",regionId:2},
    {indicatif:'353' ,  code:'IE',libelle:"Irlande",regionId:2},
    
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

