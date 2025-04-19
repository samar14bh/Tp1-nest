import { Optional } from '@nestjs/common';
import {
    IsInt,
    IsString,
    Length,
    Min,
    IsUUID,
    IsOptional,
    IsArray
  } from 'class-validator';
  
  export class CreateCvDto {
    @IsString()
    @Length(2, 100)
    name: string;
  
    @IsString()
    @Length(2, 100)
    firstName: string;
  
    @IsInt()
    @Min(18)
    age: number;
  
    @IsString()
    @Length(8, 8)
    cin: string;
  
    @IsString()
    job: string;
  
    @IsString()
    @Optional()
    path: string;
  
    @IsUUID()
    userId: string;
  
    @IsOptional()
    @IsArray()
    @IsUUID("all", { each: true })
    skillIds?: string[];
  }
  