import { IsEmail, IsNotEmpty } from "class-validator";
import { Cv } from "src/cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    username: string;

    @Column({unique:true})
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @OneToMany(() => Cv, (cv: Cv) => cv.user)
    cvs: Cv[];

}
