import { OperationType, ReinsuranceMode } from "../enums/series.enums";

export interface SeriesConfig {
  seriesKey: string;      // ex: 'POLICE_PAF_2026'
  prefix: string;         // ex: 'PAF'
  paddingLength: number;  // ex: 5
}

export interface SeriesContext {
  paysCode?: string;                    // Requis pour ASSURE (ex: 'BF', 'CI')
  operation?: OperationType;            // Requis pour POLICE, QUITTANCE...
  mode?: ReinsuranceMode;               // Requis pour POLICE, QUITTANCE...
}