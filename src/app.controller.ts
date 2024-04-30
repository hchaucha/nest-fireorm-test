import { Controller, Get } from '@nestjs/common';
import { BaseFirestoreRepository } from 'fireorm';
import { InjectRepository } from 'nestjs-fireorm';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private users: BaseFirestoreRepository<User>,
  ) {}

  @Get()
  async getUser(): Promise<Array<User>> {
    const users = await this.users.find();
    console.log('users :', users);
    return users;
  }
}
