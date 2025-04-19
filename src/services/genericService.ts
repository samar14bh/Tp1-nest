import { Injectable } from '@nestjs/common';
import { Entity, ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GenericService<T extends ObjectLiteral> {
  constructor(
    @InjectRepository(Entity)
    protected readonly repository: Repository<T>,
  ) {}

  async create(createDto: any): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity) as unknown as T;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find() as T[];
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as any, 
    });
    
    if (!entity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return entity;
  }

    
    async update(id: string, updateDto: any): Promise<T> {
        if (!updateDto) {
            throw new Error('Update data is required');
        }
        if (!id) {
            throw new Error('ID is required');
        }
        const entity = await this.repository.findOne({ where: { id } } as any);
        if (!entity) {
            throw new Error(`Entity with id ${id} not found`);
        }
        return await this.repository.merge(entity, updateDto);
    
    }

    async remove(id: string): Promise<void> {
        const entity = await this.repository.findOne({ where: { id } } as any);
        if (!entity) {
            throw new Error(`Entity with id ${id} not found`);
        }
        await this.repository.remove(entity);}

}
