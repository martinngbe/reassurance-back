import { EntityType, OperationType, ReinsuranceMode } from '../enums/series.enums';
import { SeriesConfig, SeriesContext } from '../interfaces/series-config.interface';

/**
 * Construit la configuration de série en fonction du type d'entité et du contexte.
 * 
 * Exemples de résultats :
 * - buildSeriesConfig(EntityType.ASSURE, { paysCode: 'BF' })
 *   → { seriesKey: 'ASSURE_BF_2026', prefix: 'BF', paddingLength: 4 }
 * 
 * - buildSeriesConfig(EntityType.POLICE, { operation: 'A', mode: 'F' })
 *   → { seriesKey: 'POLICE_PAF_2026', prefix: 'PAF', paddingLength: 5 }
 */
export function buildSeriesConfig(
  entityType: EntityType,
  context: SeriesContext,
): SeriesConfig {
  const year = new Date().getFullYear(); // 2026
  const entityName = EntityType[entityType]; // 'ASSURE', 'POLICE', etc.

  // ========================================
  // CAS 1 : L'ASSURÉ (dépend du pays)
  // Format : BF-26-0001
  // ========================================
  if (entityType === EntityType.ASSURE) {
    if (!context.paysCode) {
      throw new Error('Le code pays est requis pour un assuré');
    }

    return {
      seriesKey: `${entityName}_${context.paysCode.toUpperCase()}_${year}`,
      prefix: context.paysCode.toUpperCase(),
      paddingLength: 4,
    };
  } 
  if (entityType === EntityType.ACTEUR) {
    if (!context.paysCode) {
      throw new Error('Le code pays est requis pour un assuré');
    }

    return {
      seriesKey: `${entityName}_${context.paysCode.toUpperCase()}_${year}`,
      prefix: context.paysCode.toUpperCase(),
      paddingLength: 4,
    };
  }
  // ========================================
  // CAS 2 : LES AUTRES ENTITÉS (dépendent de l'opération + mode)
  // Format : PAF-26-00001
  // ========================================
  if (!context.operation || !context.mode) {
    throw new Error(
      `L'opération et le mode sont requis pour l'entité ${entityName}`,
    );
  }

  // Validation des enums
  if (!Object.values(OperationType).includes(context.operation)) {
    throw new Error(`Opération invalide : ${context.operation}`);
  }
  if (!Object.values(ReinsuranceMode).includes(context.mode)) {
    throw new Error(`Mode invalide : ${context.mode}`);
  }

  // Construction du préfixe de 3 lettres
  // Ex: POLICE + A + F = PAF
  const entityLetter = entityName.charAt(0); // P, Q, B, C, S
  const prefix = `${entityLetter}${context.operation}${context.mode}`;

  return {
    seriesKey: `${entityName}_${prefix}_${year}`,
    prefix: prefix,
    paddingLength: 5,
  };
}


/**
 * Déduit le contexte de série (opération + mode) depuis les flags métier.
 *
 * isCession = false, isFac = true   → ACCEPTATION / FACULTATIF  → xAF
 * isCession = false, isFac = false  → ACCEPTATION / TRAITE      → xAT
 * isCession = true,  isFac = true   → CESSION     / FACULTATIF  → xCF
 * isCession = true,  isFac = false  → CESSION     / TRAITE      → xCT
 */
export function buildContextFromFlags(
  isCession: boolean,
  isFac: boolean,
): SeriesContext {
  return {
    operation: isCession ? OperationType.CESSION : OperationType.ACCEPTATION,
    mode: isFac ? ReinsuranceMode.FACULTATIF : ReinsuranceMode.TRAITE,
  };
}