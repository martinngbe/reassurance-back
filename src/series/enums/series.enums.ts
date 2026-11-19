// Les types d'entités à numéroter
export enum EntityType {
  ACTEUR = 'ACTEUR',
  ASSURE = 'ASSURE',
  POLICE = 'POLICE',
  QUITTANCE = 'QUITTANCE',
  RETROCESSION = 'RETROCESSION',
  BORDEREAU = 'BORDEREAU',
  COMPTE = 'COMPTE',
  SINISTRE = 'SINISTRE',
}

// Type d'opération (Acceptation ou Cession)
export enum OperationType {
  ACCEPTATION = 'A',
  CESSION = 'C',
}

// Mode de réassurance (Facultatif ou Traité)
export enum ReinsuranceMode {
  FACULTATIF = 'F',
  TRAITE = 'T',
}