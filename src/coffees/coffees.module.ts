import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRepository } from './repository/coffee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffeesController],
  providers: [CoffeesService, CoffeeRepository],
})
export class CoffeesModule {}
