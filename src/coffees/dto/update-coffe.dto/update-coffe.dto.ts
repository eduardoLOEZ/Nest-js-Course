import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from '../create-coffee.dto/create-coffee.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  @ApiPropertyOptional()
  id?: string;
}
