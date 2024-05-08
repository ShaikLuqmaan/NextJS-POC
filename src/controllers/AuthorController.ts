import { myDataSource } from "../app-data-source";
import { Request, Response } from "express";
import { Author } from "../entity/author.entity";
import { Book } from "../entity/book.entity";

export class AuthorController {
  async createAuthor(req: Request, res: Response) {
    const authorRepository = myDataSource.getRepository(Author);
    const { name, books } = req.body;

    try {
      const author = new Author();
      author.name = name;
      author.books = books.map((book) => {
        const newBook = new Book();
        newBook.title = book.title;
        return newBook;
      });

      await authorRepository.save(author);
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getAllAuthors(req: Request, res: Response) {
    const authorRepository = myDataSource.getRepository(Author);
    const authors = await authorRepository.find();
    res.send(authors);
  }

  async getBooksByAuthor(req: Request, res: Response) {
    try {
      const queryParam = req.query.author as string;
      const authorRepository = myDataSource.getRepository(Author);
      const author = await authorRepository.findOneBy({ name: queryParam });

      res.send(author.books);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error: ${error.message}`);
    }
  }
}
