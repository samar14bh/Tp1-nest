import { IsInt, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';


export class FilterCvDto{
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    age?:number;


    @IsOptional()
    @IsString()
    criteria?:string;
}