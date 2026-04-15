import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from 'src/entities/User';
import { Roles } from 'src/decorators/role.decorator';

@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Post()
  createUser(@Body() userData: UserEntity) {
    return this.userService.create(userData);
  }

  @Roles('admin')
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() userData: Partial<UserEntity>) {
    return this.userService.update(+id, userData);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
