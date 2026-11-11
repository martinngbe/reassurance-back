// Les types d'entités à numéroter
export enum EntityType {
  ACTEUR = 'ACTEUR',
  ASSURE = 'ASSURE',
  POLICE = 'POLICE',
  QUITTANCE = 'QUITTANCE',
  PLACEMENT = 'PLACEMENT',
  BORDEREAU = 'BORDEREAU',
  COMPTE = 'COMPTE',
  SINISTRE = 'SINISTRE',
}

// Type d'opération (Acceptation ou Cession)
export enum OperationType {
  ACCEPTATION = 'A',
  CESSION = 'C',
  PLACEMENT = 'L',
}

// Mode de réassurance (Facultatif ou Traité)
export enum ReinsuranceMode {
  FACULTATIF = 'F',
  TRAITE = 'T',
}