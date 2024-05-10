import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity/flavor.entity';
import { IsOptional } from 'class-validator';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @IsOptional()
  @Column({ nullable: true })
  description: string;

  @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    () => Flavor,
    (flavor) => flavor.coffees,
    {
      cascade: true, // 👈 or optionally just insert or update ['insert']
    }, // what is "coffee" within the Flavor Entity
  ) // 👈
  flavors: Flavor[];
}
