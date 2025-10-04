import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class ListUsersDto {
  @ApiPropertyOptional({
    description: 'Edad mínima del usuario para filtrar los resultados.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minAge?: number = 0;

  @ApiPropertyOptional({
    description: 'Edad máxima del usuario para filtrar los resultados.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  maxAge?: number = 100;

  @ApiPropertyOptional({
    description: 'Número de página para la paginación (por defecto 1).',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad de usuarios por página (por defecto 10).',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
