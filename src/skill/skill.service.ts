import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { In, Repository } from 'typeorm';
import { GenericService } from 'src/services/genericService';


@Injectable()
export class SkillService extends GenericService<Skill> {
  constructor(
    @InjectRepository(Skill)
    protected readonly repository: Repository<Skill>,  // Inject Skill repository
  ) {
    super(repository); 
  }

  async findByDesignation(designation: string): Promise<Skill[]> {
    return this.repository.find({ where: { designation } });
  }
  async findByCvId(cvId: string): Promise<Skill[]> {
    return this.repository.find({ where: { cvs: { id: cvId } } });
  }
  async findByIds(ids: string[]): Promise<Skill[]> {
    return this.repository.find({
      where: { id: In(ids) },
    });
  }

  
 
}
