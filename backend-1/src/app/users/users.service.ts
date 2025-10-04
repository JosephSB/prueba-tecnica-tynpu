import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { USERS_MOCK } from '../../database/users';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {
      data: {
        id: Date.now().toString(),
        name: createUserDto.name,
        email: createUserDto.email,
        age: createUserDto.age,
        role: createUserDto.role,
        createdAt: new Date(),
      },
      message: 'Nuevo usuario creado',
    };
  }

  findAll(listUsersDto: ListUsersDto) {
    const users = USERS_MOCK.filter(
      (u) => u.age >= listUsersDto.minAge && u.age <= listUsersDto.maxAge,
    );
    const start = (listUsersDto.page - 1) * listUsersDto.limit;
    const end = start + listUsersDto.limit;
    const pagination = users.slice(start, end);

    return {
      data: pagination,
      message: 'Lista de usuarios',
    };
  }
}
