import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from 'src/common/strategies/google.strategy';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: 'jwtsecret',
			signOptions: { expiresIn: '60s' },
		}),
		UserModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
