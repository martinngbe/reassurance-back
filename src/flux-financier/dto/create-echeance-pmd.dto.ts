import { IsBoolean, IsInt,IsString,IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import Decimal from 'decimal.js';

export class CreateEcheancePmdDto {

        @IsString()  
        @IsOptional()
        numeroTranche?: string

        @IsString()  
        @IsOptional()
        periode?: string;

        @IsString()  
        @IsNotEmpty()
        dateEcheance!: string;


        @IsNumber()        
        coursDevise: Decimal = new Decimal(0);


        @IsNumber() 
        prime: Decimal = new Decimal(0);

        @IsBoolean()
        @IsOptional()
        isAnnule?: boolean;

        @IsNumber() 
        @IsOptional() 
        echeancePmdIdAnnule?: number;

        /////////// RELATIONS ///////

        @IsInt()
        deviseId!: number;

        @IsInt()
        quittanceId!: number;

        @IsInt()
        @IsOptional()
        quittancePlacementId?: number;
    


}
