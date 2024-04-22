import { Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeRepository } from './repository/coffee.repository';
import { UpdateCoffeeDto } from './dto/update-coffe.dto/update-coffe.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly coffeRepository: CoffeeRepository) {}

  async findAll() {
    try {
      const coffees = await this.coffeRepository.findAll();
      return coffees;
    } catch (error) {}
  }

  async findOne(id: number) {
    const coffe = await this.coffeRepository.findById(id);

    if (!coffe) {
      throw new NotFoundException(`Coffe #${id} not found`);
    }
    return coffe;
  }

  async createCoffee(createCoffeeDto: any) {
    const coffee = await this.coffeRepository.save(createCoffeeDto); // Utilizar save en lugar de store
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    try {
      await this.findOne(id);
      return await this.coffeRepository.updateOne(id, updateCoffeeDto);
    } catch (error) {
      // Manejar el error
    }
  }

  async remove(id: number) {
    return await this.coffeRepository.destroy(id);
  }
}
