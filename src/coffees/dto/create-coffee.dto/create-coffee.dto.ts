import { IsString } from 'class-validator';
import { Flavor } from 'src/coffees/entities/flavor.entity/flavor.entity';

export class CreateCoffeeDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsString({ each: true })
  flavors: Flavor[];
}
