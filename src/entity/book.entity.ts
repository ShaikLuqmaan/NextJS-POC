import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Author } from "../entity/author.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
