import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@IsEmail()
	@IsNotEmpty({ message: 'Email is required.' })
	email: string;

	@IsString({ message: 'Password must be a string.' })
	@IsNotEmpty({ message: 'Password is required.' })
	password: string;
}