import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  name: string;

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: "boolean",
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt: Date;

  @Column({
    type: "jsonb",
  })
  metadata?: object;

  @Column({
    type: "uuid",
  })
  uuid?: string;

  @Column({
    type: "inet",
  })
  ipAddress?: string;

  @Column({
    type: "point",
    nullable: true,
  })
  location?: string;

  @Column({ type: "bytea", nullable: true })
  imageData?: Buffer;
}
