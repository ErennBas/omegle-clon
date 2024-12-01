import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async create(user: User): Promise<User> {
		return this.userRepository.save(user);
	}

	async findByOne(where: Record<string, any>): Promise<User> {
		return this.userRepository.findOne({ where });
	}

	async findBy(where: Record<string, any>): Promise<User[]> {
		return this.userRepository.find({ where });
	}
}
