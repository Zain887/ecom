import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      return { message: 'user Already exits. please Login.' }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    return await this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOrThrowError(id);
    this.userRepo.merge(existingUser, updateUserDto);
    const updatedUser = await this.userRepo.save(existingUser);
    return updatedUser;
  }

  async remove(id: number) {
    await this.findOrThrowError(id);
    return await this.userRepo.delete(id);
  }


  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } })
  }

  async findOrThrowError(id: number): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`user with ID${id} not found`);
      }
      return user;
    } catch (e) {
      throw (e);
    }
  }
}
