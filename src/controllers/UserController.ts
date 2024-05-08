import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";
import { Profile } from "../entity/profile.entity";

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

  async createUserWithProfile(req: Request, res: Response) {
    const userRepository = myDataSource.getRepository(User);
    const { firstName, lastName, age, bio } = req.body;

    try {
      const profile = new Profile();
      profile.age = age;
      profile.bio = bio;

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.profile = profile;

      await userRepository.save(user);
      res.send({
        message: "User with profile successfully created",
        user: user,
      });
    } catch (error) {
      res.status(500).send("Error creating the user with profile");
    }
  }
  async getUsersWithProfile(req: Request, res: Response) {
    const userRepository = myDataSource.getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  }

  async updateUserWithProfile(req: Request, res: Response) {
    const userRepository = myDataSource.getRepository(User);
    const id = parseInt(req.params.id);
    const { firstName, lastName, age, bio } = req.body;

    try {
      const user = await userRepository.findOne({
        where: { id },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      user.firstName = firstName;
      user.lastName = lastName;
      if (user.profile) {
        user.profile.age = age;
        user.profile.bio = bio;
      }

      await userRepository.save(user);
      res.send(user);
    } catch (error) {
      res.status(500).send("Error updating the user: " + error.message);
    }
  }

  async deleteUserProfile(req: Request, res: Response) {
    const userRepository = myDataSource.getRepository(User);
    const id = parseInt(req.params.id);

    try {
      const user = await userRepository.findOneBy({ id });

      if (!user) {
        return res.status(404).send("User not found");
      }

      await userRepository.remove(user);
      res.status(200).send("User Deleted");
    } catch (error) {
      res.status(500).send("Error deleting the user: " + error.message);
    }
  }
}
