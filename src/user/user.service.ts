import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericService } from 'src/services/genericService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService  extends GenericService<User> {
  getRepository(): Repository<User> {
    return this.repository;
  }
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository); 
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.repository.find({ where: { email } });
  }
}
