import { Cv } from "src/cv/entities/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Skill {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    designation: string;


    @ManyToMany(()=>Cv,(cv)=>cv.skills)
    cvs: Cv[];
}
