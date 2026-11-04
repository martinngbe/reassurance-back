// src/quittances/services/quittance-calcul.service.ts
import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { Quittance } from '../entities/quittance.entity';
import { QuittancePlacement } from '../entities/quittance-placement.entity';

// Configuration globale : précision et arrondi bancaire
Decimal.set({
  precision: 28,
  rounding: Decimal.ROUND_HALF_UP,
});

const FORMULE_VERSION = 'v1';

/**
 * Inputs nécessaires au calcul (extraits d'une Quittance ou d'un DTO).
 * Tous les champs sont optionnels car on peut simuler partiellement.
 */
export interface QuittancePlacementInputs {
  primeBrute?: string | number | Decimal | null;
  tauxCession?: string | number | Decimal | null;
  tauxCommission?: string | number | Decimal | null;
  commissionFixe?: string | number | Decimal | null;
}

/**
 * Résultats du calcul (tous les champs dérivés à persister).
 */
export interface QuittancePlacementCalculee {
  primeCedee: Decimal;
  commission: Decimal;
  primeNette: Decimal;
  //formuleVersion: string;
 // calculeLe: Date;
}

@Injectable()
export class QuittancePlacementCalculService {

  /**
   * Calcule tous les champs dérivés d'une quittance.
   *
   * Règles :
   * - La commission est calculée SOIT par taux (% de la prime acceptée),
   *   SOIT par montant fixe. Le taux est prioritaire s'il est > 0.
   * - Tous les arrondis sont faits à 5 décimales (scale de la colonne).
   * - Les valeurs null/undefined sont traitées comme 0.
   */
  calculer(input: QuittancePlacementInputs, scale = 5): QuittancePlacementCalculee {
    // Normalisation des entrées en Decimal
    const primeBrute = this.toDecimal(input.primeBrute);
    const tauxCession = this.toDecimal(input.tauxCession);
    const tauxCommission = this.toDecimal(input.tauxCommission);
    const commissionFixe = this.toDecimal(input.commissionFixe);
    console.log(" ____________ QuittancePlacementCalculService.calculer _______________")
    console.log(" primeBrute      :",primeBrute)
    console.log(" tauxCession     :",tauxCession)
    console.log(" tauxCommission  :",tauxCommission)
    console.log(" commissionFixe  :",commissionFixe)
    console.log(" ____________  _______________")
    // ── ÉTAPE 1 : Prime cédée ─────────────────────────────────
    const primeCedee = primeBrute
      .mul(tauxCession.dividedBy(100))
      .toDecimalPlaces(scale);
    console.log("ÉTAPE 1 : primeCedee = primeBrute * (tauxCession/100) :",primeCedee )
   
       // ── ÉTAPE 3 : Commission (taux prioritaire sur fixe) ──────
    let commission: Decimal;
    if (tauxCommission.greaterThan(0)) {
      commission = primeCedee
        .mul(tauxCommission.dividedBy(100))
        .toDecimalPlaces(scale);
        console.log("ÉTAPE 2 : commission = primeCedee * (tauxCommission/100) :",commission )
    } else if (commissionFixe.greaterThan(0)) {
      commission = commissionFixe.toDecimalPlaces(scale);
      console.log("ÉTAPE 3 : commission :",commission )
    } else {
      commission = new Decimal(0);
       console.log("ÉTAPE 3 : commission :",commission )
    }
    
    // ── ÉTAPE 4 : Prime nette ─────────────────────────────────
    const primeNette = primeCedee
      .minus(commission)
      .toDecimalPlaces(scale);
    console.log("ÉTAPE 4 : primeNette = primeCedee - commission :",primeNette )
    return {
      primeCedee,
      commission,
      primeNette,
      //formuleVersion: FORMULE_VERSION,
      //calculeLe: new Date(),
    };
  }

  /**
   * Applique le calcul à une entité Quittance existante et retourne
   * un objet partiel prêt à être mergé (Object.assign).
   */
  appliquer(q: Partial<QuittancePlacement>): Partial<QuittancePlacement> {
    const calc = this.calculer({
      primeBrute: q.primeBrute,
      tauxCession: q.tauxCession,
      tauxCommission: q.tauxCommission,
      commissionFixe: q.commissionFixe,
    });

    return {
      primeCedee: calc.primeCedee as any,
      commissionFixe: calc.commission as any, // ⚠️ voir note ci-dessous
      primeNette: calc.primeNette as any,
      //formuleVersion: calc.formuleVersion,
      //calculeLe: calc.calculeLe,
    };
  }

  /**
   * Convertit n'importe quelle valeur en Decimal (0 si null/undefined).
   */
  private toDecimal(value: string | number | Decimal | null | undefined): Decimal {
    if (value === null || value === undefined || value === '') {
      return new Decimal(0);
    }
    const d = new Decimal(value);
    if (d.isNaN()) {
      throw new Error( `QuittanceCalculService: valeur invalide "${value}"`);
    }
    return d;
  }
}