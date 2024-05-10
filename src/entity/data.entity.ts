import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 10, scale: 2 })
  decimalValue: number;
}
