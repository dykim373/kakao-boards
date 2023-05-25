import { Injectable } from '@nestjs/common';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthCreateDto } from './dto/auth-create.dto';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }
    
    async createAccount(authCreateDto: AuthCreateDto): Promise<User> {
        const { userId, password, username } = authCreateDto;
        const salt = await bcrypt.genSalt(); //솔트 생성
        const hashedPassword =  await bcrypt.hash(password, salt); //password 해쉬
        const user: User = this.create({
            userId,
            password: hashedPassword,
            iconNum: 1,
            username
        });
        
        /*원하는 에러메세지를 띄우기 위해 try catch문에 this.save함수를 넣는다.*/
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Already existing userId !')
            } else {
                throw new InternalServerErrorException();

            }
        }
        return user;
    }
}