// src/quittances/services/quittance-calcul.service.ts
import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { Quittance } from '../entities/quittance.entity';

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
export interface QuittanceInputs {
  primeBrute?: string | number | Decimal | null;
  tauxCedante?: string | number | Decimal | null;
  tauxAccepte?: string | number | Decimal | null;
  tauxCommission?: string | number | Decimal | null;
  commissionFixe?: string | number | Decimal | null;
}

/**
 * Résultats du calcul (tous les champs dérivés à persister).
 */
export interface QuittanceCalculee {
  primeCedee: Decimal;
  primeAcceptee: Decimal;
  commission: Decimal;
  primeNette: Decimal;
  formuleVersion: string;
  calculeLe: Date;
}

@Injectable()
export class QuittanceCalculService {

  /**
   * Calcule tous les champs dérivés d'une quittance.
   *
   * Règles :
   * - La commission est calculée SOIT par taux (% de la prime acceptée),
   *   SOIT par montant fixe. Le taux est prioritaire s'il est > 0.
   * - Tous les arrondis sont faits à 5 décimales (scale de la colonne).
   * - Les valeurs null/undefined sont traitées comme 0.
   */
  calculer(input: QuittanceInputs, scale = 5): QuittanceCalculee {
    // Normalisation des entrées en Decimal
    const primeBrute = this.toDecimal(input.primeBrute);
    const tauxCedante = this.toDecimal(input.tauxCedante);
    const tauxAccepte = this.toDecimal(input.tauxAccepte);
    const tauxCommission = this.toDecimal(input.tauxCommission);
    const commissionFixe = this.toDecimal(input.commissionFixe);
    console.log(" ____________ QuittanceCalculService.calculer _______________")
    console.log(" primeBrute      :",primeBrute)
    console.log(" tauxCedante     :",tauxCedante)
    console.log(" tauxAccepte     :",tauxAccepte)
    console.log(" tauxCommission  :",tauxCommission)
    console.log(" commissionFixe  :",commissionFixe)
    console.log(" ____________  _______________")
    // ── ÉTAPE 1 : Prime cédée ─────────────────────────────────
    const primeCedee = primeBrute
      .mul(tauxCedante.dividedBy(100))
      .toDecimalPlaces(scale);
    console.log("ÉTAPE 1 : primeCedee = primeBrute * (tauxCedante/100) :",primeCedee )
    // ── ÉTAPE 2 : Prime acceptée ──────────────────────────────
    const primeAcceptee = primeCedee
      .mul(tauxAccepte.dividedBy(100))
      .toDecimalPlaces(scale);

      console.log("ÉTAPE 2 : primeAcceptee = primeCedee * (tauxAccepte/100) :",primeAcceptee )
    // ── ÉTAPE 3 : Commission (taux prioritaire sur fixe) ──────
    let commission: Decimal;
    if (tauxCommission.greaterThan(0)) {
      commission = primeAcceptee
        .mul(tauxCommission.dividedBy(100))
        .toDecimalPlaces(scale);
        console.log("ÉTAPE 3 : commission = primeAcceptee * (tauxCommission/100) :",commission )
    } else if (commissionFixe.greaterThan(0)) {
      commission = commissionFixe.toDecimalPlaces(scale);
      console.log("ÉTAPE 3 : commission :",commission )
    } else {
      commission = new Decimal(0);
       console.log("ÉTAPE 3 : commission :",commission )
    }
    
    // ── ÉTAPE 4 : Prime nette ─────────────────────────────────
    const primeNette = primeAcceptee
      .minus(commission)
      .toDecimalPlaces(scale);
    console.log("ÉTAPE 4 : primeNette = primeAcceptee - commission :",primeNette )
    return {
      primeCedee,
      primeAcceptee,
      commission,
      primeNette,
      formuleVersion: FORMULE_VERSION,
      calculeLe: new Date(),
    };
  }

  /**
   * Applique le calcul à une entité Quittance existante et retourne
   * un objet partiel prêt à être mergé (Object.assign).
   */
  appliquer(q: Partial<Quittance>): Partial<Quittance> {
    const calc = this.calculer({
      primeBrute: q.primeBrute,
      tauxCedante: q.tauxCedante,
      tauxAccepte: q.tauxAccepte,
      tauxCommission: q.tauxCommission,
      commissionFixe: q.commissionFixe,
    });

    return {
      primeCedee: calc.primeCedee as any,
      primeAcceptee: calc.primeAcceptee as any,
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