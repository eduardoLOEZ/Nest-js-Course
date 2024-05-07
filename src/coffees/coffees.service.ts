import { Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeRepository } from './repository/coffee.repository';
import { UpdateCoffeeDto } from './dto/update-coffe.dto/update-coffe.dto';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    private readonly coffeRepository: CoffeeRepository,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    try {
      const coffees = await this.coffeRepository.find({
        relations: {
          flavors: true,
        },
        skip: offset, //se salta ese coffee y muestra todos menos el primero por ejemplo
        take: limit, //si colocamos 2, mostrara solo esos dos
      });

      return coffees;
    } catch (error) {}
  }

  async findOne(id: number) {
    const coffe = await this.coffeRepository.findOne({
      where: { id: +id },
      relations: {
        flavors: true,
      },
    });

    if (!coffe) {
      throw new NotFoundException(`Coffe #${id} not found`);
    }
    return coffe;
  }

  async createCoffee(createCoffeeDto: any) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = await this.coffeRepository.save({
      ...createCoffeeDto,
      flavors,
    }); // Utilizar save en lugar de store
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
