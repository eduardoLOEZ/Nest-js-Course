import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto/update-coffe.dto';
import { PaginationQueryDto } from './dto/pagination-query/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeessService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeessService.findAll(paginationQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: number) {
    return this.coffeessService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeessService.createCoffee(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeessService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.coffeessService.remove(id);
  }
}
