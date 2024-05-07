import express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user.entity";
import { myDataSource } from "./app-data-source";
import { UserController } from "./controllers/UserController";

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());

const userController = new UserController();
app.get("/users", userController.getAllUsers);
app.post("/create-users", userController.createUser);
app.get("/user/:id", userController.userById);
app.put("/update-user/:id", userController.updateUser);
app.delete("/delete-user/:id", userController.deleteUser);

// Setup your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
