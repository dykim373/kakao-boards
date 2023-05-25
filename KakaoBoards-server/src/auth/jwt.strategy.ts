import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport"
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234', //해석을 위한 시크릿 키
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //토큰의 타입
        })
    }

    async validate(payload): Promise<User> {
        const { userId } = payload;
        const user = await this.userRepository.findOneBy({ userId });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}