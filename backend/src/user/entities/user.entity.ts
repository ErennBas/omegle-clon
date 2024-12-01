import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	roomId: string;

	@Column({ default: true })
	accountStatus: boolean;

	@Column({ type: 'bigint', default: Date.now() })
	lastLogin: Timestamp;
}

export interface IUser {
	id: number;
	email: string;
	password: string;
	roomId: string;
	accountStatus: boolean;
	lastLogin: Timestamp;
}
