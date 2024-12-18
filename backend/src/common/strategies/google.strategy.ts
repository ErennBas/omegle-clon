import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private configService: ConfigService) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
			scope: ['email', 'profile'],
		});
	}

	async validate(accessToken: string, profile: any, done: VerifyCallback): Promise<any> {
		const { name, emails, photos } = done;
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			accessToken,
		};

		return user;
	}
}
