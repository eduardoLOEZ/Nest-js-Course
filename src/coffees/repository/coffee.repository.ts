import { Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { CreateCoffeeDto } from '../dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffe.dto/update-coffe.dto';
import { InjectRepository } from '@nestjs/typeorm';

//extiende la clase repositorio porporcionada por TypeORM
//esto significa que esta clase hereda todo los metodos y propiedades de Repository<Coffee>
export class CoffeeRepository extends Repository<Coffee> {
  //en el constructor se usa inhectRepository para inyectar el repositorio de TypeORM de la entidad coffee
  //esto permite acceder a los metodos proporcionados por el Repository dentro de la clase
  constructor(
    @InjectRepository(Coffee) private coffeeRepository: Repository<Coffee>,
  ) {
    //el super se utiliza para llamar al constructor de la clase padre y
    //asegurar que el CoffeeRepository tenga todas las configuraciones necesarias y funcione correctamente como una extensión de la clase Repository<Coffee>.
    //Esto es necesario para heredar comportamientos y propiedades de la clase padre y evitar errores de inicialización.
    super(
      coffeeRepository.target,
      coffeeRepository.manager,
      coffeeRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Coffee[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Coffee | null> {
    return this.findOne({ where: { id: +id }, relations: { flavors: true } });
  }

  public async store(coffeDTO: CreateCoffeeDto): Promise<Coffee> {
    const newCoffee = this.create(coffeDTO);
    return this.save(newCoffee);
  }

  public async updateOne(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee | null> {
    const coffee = await this.findById(id);
    if (!coffee) return undefined;
    Object.assign(coffee, updateCoffeeDto);

    return this.save(coffee);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}
