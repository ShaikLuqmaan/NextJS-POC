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
    nullable: true,
  })
  metadata?: object;

  @Column({
    type: "uuid",
    nullable: true,
  })
  uuid?: string;

  @Column({
    type: "inet",
    nullable: true,
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
