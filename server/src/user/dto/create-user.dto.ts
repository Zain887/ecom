import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ description: 'user First Name', example: 'Zain' })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'user Last Name', example: 'Riaz' })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'user email', example: 'zainansari887@gmail.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'user account password', example: 'Zain887@' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
