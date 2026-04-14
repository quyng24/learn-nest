import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/passport/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        'ac1aa6fd89415b7433235df7837b1f1b0df2f418d43e8f9481383d66eb939813',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
