import { IsEmail, IsInt, IsString, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Ana Torres',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  @Transform(({ value }) => sanitize(value))
  name: string;

  @ApiProperty({
    example: 'ana.torres@example.com',
    description: 'Correo electrónico válido',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 28,
    description: 'Edad del usuario (entre 18 y 100)',
    minimum: 18,
    maximum: 100,
  })
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @ApiProperty({
    example: 'user',
    description: 'Rol dentro de la aplicación',
    enum: ['user', 'admin', 'moderator'],
  })
  @IsString()
  role: string;
}
