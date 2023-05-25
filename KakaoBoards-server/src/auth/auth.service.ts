import { Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthCreateDto } from './dto/auth-create.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async getUserByID(userId: string): Promise<User> {
        const user = await this.userRepository.findOneBy({userId})
        if(!user) {
            throw new NotFoundException(`Can't find User with id ${userId} !`);
        }
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createAccount(authCreateDto: AuthCreateDto): Promise<User> {
        return this.userRepository.createAccount(authCreateDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken }> {
        const { userId, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({userId}); //userId로 찾고
        if(user && await bcrypt.compare(password, user.password)) { //password 해쉬 비교
            //유저 토큰 생성 ( Secret + Payload )
            const payload = { userId };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('LogIn Failed')
        }
    }

    async deleteAccount(userId: string, user: User): Promise<void> {
        const found: User = await this.getUserByID(userId);
        if(found && found.id === user.id){
            await this.userRepository.delete(found.id);
        } else {
            throw new UnauthorizedException(`You cannot delete someone else\'s account`);
        }
    }
}
