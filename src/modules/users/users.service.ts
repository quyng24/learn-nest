import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findEmail(email);
    if (!user) return null;
    const status = bcrypt.compareSync(password, user.password);
    if (status) return user;
    return null;
  }

  async create(userData: Partial<UserEntity>) {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    const user = this.userRepository.create(userData);
    user.created_at = new Date();
    user.updated_at = new Date();

    const hashPassword: string = await bcrypt.hash(userData.password as string, 10);
    user.password = hashPassword;
    console.log(user);
    return this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<UserEntity>) {
    const user = await this.userRepository.preload({
      id,
      ...userData,
      updated_at: new Date(),
    });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.userRepository.save(user);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
