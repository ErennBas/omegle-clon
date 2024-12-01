import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUser, User } from 'src/user/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	@Inject(UserService)
	private readonly userService: UserService;

	constructor(private jwtService: JwtService) {}

	async register(registerDto: AuthDto): Promise<AuthResponse> {
		const isExist = await this.userService.findByOne({ email: registerDto.email });
		if (isExist) {
			throw new HttpException(
				{ message: 'This email used by another user.' },
				HttpStatus.BAD_REQUEST,
			);
		}

		return this.generateUser(registerDto.email, registerDto.password);
	}

	async login(loginDto: any): Promise<AuthResponse> {
		const existUser = await this.userService.findByOne({ email: loginDto.email });
		if (!existUser) {
			throw new HttpException(
				{ message: 'Email or password is incorrect.' },
				HttpStatus.BAD_REQUEST,
			);
		}

		const isMatch = await bcrypt.compare(loginDto.password, existUser.password);
		if (!isMatch) {
			throw new HttpException(
				{ message: 'Email or password is incorrect.' },
				HttpStatus.BAD_REQUEST,
			);
		}

		delete existUser.password;

		return {
			access_token: this.jwtService.sign({ ...existUser }, { expiresIn: '1 days' }),
			exp: 86400,
		};
	}

	async googleLogin(user: IUser): Promise<AuthResponse> {
		if (!user) throw new BadRequestException('Unauthenticated');

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const existUser = await this.userService.findByOne({ email: user.email });
		if (!existUser) return this.generateUser(user.email);

		delete existUser.password;

		return {
			access_token: this.jwtService.sign({ existUser }, { expiresIn: '1 days' }),
			exp: 86400,
		};
	}

	async generateUser(email: string, password?: string): Promise<AuthResponse> {
		const user = new User();
		user.email = email;
		user.roomId = uuidv4();
		user.password = await bcrypt.hash(password ?? uuidv4(), 10);

		const createdUser = await this.userService.create(user);

		return {
			access_token: await this.jwtService.signAsync({
				id: createdUser.id,
				email: createdUser.email,
				roomId: createdUser.roomId,
			}),
			exp: 86400,
		};
	}
}

type AuthResponse = {
	access_token: string;
	exp: number;
};
