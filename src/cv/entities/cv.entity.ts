import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsInt, IsString, Length, Min } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';


@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  @Length(2, 50)
  name: string;

  @Column()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @Column()
  @IsInt()
  @Min(18)
  age: number;

  @Column({ unique: true })
  @IsString()
  @Length(8, 8)
  cin: string;

  @Column()
  @IsString()
  job: string;

  @Column()
  @IsString()
  path: string;


  @ManyToOne(() => User, (user) => user.cvs, { nullable: false, onDelete: 'CASCADE', eager: true })
  user: User;  

  @ManyToMany(() => Skill, (skill) => skill.cvs, { cascade: true })
  @JoinTable() // This creates the junction table
  skills: Skill[];
 
}
