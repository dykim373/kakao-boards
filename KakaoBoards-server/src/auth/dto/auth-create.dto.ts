import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCreateDto {
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'Id only accepts english and number!'
    })
    userId: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number!'
    })
    password: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;
}