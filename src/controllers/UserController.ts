import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    // const users = await myDataSource.getRepository(User).find();
    // Using EntityManager to find all users
    const users = await myDataSource.manager.find(User);
    res.json(users);
  }

  async createUser(req: Request, res: Response) {
    // const user = myDataSource.getRepository(User).create(req.body);
    // const results = await myDataSource.getRepository(User).save(user);

    // Using EntityManager to create and save a new user
    const user = myDataSource.manager.create(User, req.body);
    const results = await myDataSource.manager.save(User, user);

    return res.send(results);
  }
  async userById(req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
      id: parseInt(req.params.id),
    });
    return res.send(results);
  }

  async updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Invalid ID format");
    }

    const user = await myDataSource.getRepository(User).findOneBy({ id: id });
    if (!user) {
      return res.status(404).send("User not found");
    }

    myDataSource.getRepository(User).merge(user, req.body);
    const results = await myDataSource.getRepository(User).save(user);
    return res.send(results);
  }

  async deleteUser(req: Request, res: Response) {
    const results = await myDataSource
      .getRepository(User)
      .delete(req.params.id);
    return res.send(results);
  }
}
