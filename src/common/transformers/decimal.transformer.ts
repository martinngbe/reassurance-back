// src/common/transformers/decimal.transformer.ts
import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  to(value: Decimal | string | number | null | undefined): string | null {
    if (value === null || value === undefined) return null;
    return new Decimal(value).toFixed();
  }
  from(value: string | null): Decimal | null {
    return value === null ? null : new Decimal(value);
  }
}