import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		CacheModule.register({
			isGlobal: true,
		}),
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('HOST'),
				port: configService.get('PORT'),
				username: configService.get('USER'),
				password: configService.get('PASSWORD'),
				database: configService.get('DATABASE'),
				entities: [],
				synchronize: true,
				autoLoadEntities: true,
			}),
		}),
	],
	controllers: [AppController],
	providers: [AppService, ChatGateway],
})
export class AppModule {}
