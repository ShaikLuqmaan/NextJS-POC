import express from "express";
import multer from "multer";
import { Request, Response } from "express";
import { User } from "./entity/user.entity";
import { myDataSource } from "./app-data-source";
import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";

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
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

// User
const userController = new UserController();
app.get("/users", userController.getAllUsers);
app.post("/create-users", userController.createUser);
app.get("/user/:id", userController.userById);
app.put("/update-user/:id", userController.updateUser);
app.delete("/delete-user/:id", userController.deleteUser);

// Product
const productController = new ProductController();
app.get("/products", productController.getProducts);
app.post("/create-products", productController.createProduct);
app.get("/product/:id", productController.getProductById);
// Route for uploading a product with an image
app.post(
  "/create-product-image",
  upload.single("image"),
  productController.createProductWithImage
);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
