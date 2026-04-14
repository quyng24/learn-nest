import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  register(@Body() userData: any) {
    return this.userService.create(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request: any) {
    return this.authService.login(request.user);
  }
}
