import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';
import Decimal from 'decimal.js';

export class CreateBordereauDto {
    @IsOptional()
    numero!: string

    @IsOptional()
    dateReception?: Date;

    @IsOptional()
    periodeDebut?: Date;

    @IsOptional()
    periodeFin?: Date;

    @IsInt()
    deviseId!: number;

    @IsNumber()
    coursDevise: number = 1;

    @IsNumber()
    primeBrute: number=0;

    @IsNumber()
    @IsOptional()
    primeNette: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    tauxCedante: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    tauxAccepte: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    tauxCession: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    commissionFixe: Decimal = new Decimal(0); 

    @IsNumber()
    @IsOptional()
    tauxCommission: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    taxeSurCommission: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    taxeSurPrime: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    primeCedee: Decimal = new Decimal(0);

    @IsNumber()
    @IsOptional()
    primeAcceptee: Decimal = new Decimal(0);


    @IsInt()
    @IsOptional()
    quittanceId?: number;

    @IsInt()
    @IsOptional()
    quittancePlacementId?: number;

    @IsBoolean()
    @IsOptional()
    isManuel?: boolean;

    @IsBoolean()
    @IsOptional()
    isAnnule?: boolean;

    @IsInt()
    @IsOptional()
    bordereauIdAnnule?: number;
}
