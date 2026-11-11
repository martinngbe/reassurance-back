import { buildSeriesConfig, EntityType, OperationType, ReinsuranceMode } from './series';

// Test 1 : Assuré du Burkina Faso
const config1 = buildSeriesConfig(EntityType.ASSURE, { paysCode: 'BF' });
console.log('Assuré BF:', config1);
// → { seriesKey: 'ASSURE_BF_2026', prefix: 'BF', paddingLength: 4 }

// Test 2 : Police Acceptation Facultatif
const config2 = buildSeriesConfig(EntityType.POLICE, {
  operation: OperationType.ACCEPTATION,
  mode: ReinsuranceMode.FACULTATIF,
});
console.log('Police PAF:', config2);
// → { seriesKey: 'POLICE_PAF_2026', prefix: 'PAF', paddingLength: 5 }

// Test 3 : Sinistre Cession Traité
const config3 = buildSeriesConfig(EntityType.SINISTRE, {
  operation: OperationType.CESSION,
  mode: ReinsuranceMode.TRAITE,
});
console.log('Sinistre SCT:', config3);
// → { seriesKey: 'SINISTRE_SCT_2026', prefix: 'SCT', paddingLength: 5 }

// Test 4 : Erreur attendue (assuré sans pays)
try {
  buildSeriesConfig(EntityType.ASSURE, {});
} catch (e:any) {
  console.log('Erreur attendue:', e.message);
}