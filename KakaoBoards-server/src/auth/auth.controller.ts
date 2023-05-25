import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './custom-deco/get-user.decorator';
import { AuthCreateDto } from './dto/auth-create.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/')
    getAllUsers(): Promise<User[]> {
        return this.authService.getAllUsers();
    }
    
    @Get('/current')
    @UseGuards(AuthGuard())
    getCurrentUser(@GetUser() user: User) { //GetUser : 커스텀 데코레이터
        return user;
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    createAccount(@Body() authCreateDto: AuthCreateDto): Promise<User> {
        return this.authService.createAccount(authCreateDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Delete('/:userId')
    @UseGuards(AuthGuard())
    deleteAccount(
        @Param('userId') userId: string,
        @GetUser() user: User
    ): Promise<void> {
        return this.authService.deleteAccount(userId, user);
    }
}
