import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersDto } from './dto/list-users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    schema: {
      example: {
        message: 'Usuario creado',
        data: {
          id: '1f2b3c4d-aaaa-bbbb-cccc-1234567890ab',
          name: 'Ana Torres',
          email: 'ana.torres@example.com',
          age: 28,
          role: 'user',
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/list')
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios filtrados',
    schema: {
      example: {
        total: 5,
        page: 1,
        data: [],
      },
    },
  })
  findAll(@Query() listUsersDto: ListUsersDto) {
    return this.usersService.findAll(listUsersDto);
  }
}
