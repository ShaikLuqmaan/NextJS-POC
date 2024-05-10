import express from "express";
import multer from "multer";
import { Request, Response } from "express";
import { User } from "./entity/user.entity";
import { myDataSource } from "./app-data-source";
import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";
import { AuthorController } from "./controllers/AuthorController";
import { StudentController } from "./controllers/StudentController";

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

// With relation ships
app.post("/create-user-profiles", userController.createUserWithProfile);
app.get("/user-profiles", userController.getUsersWithProfile);
app.put("/update-user-profiles/:id", userController.updateUserWithProfile);
app.delete("/delete-user-profile/:id", userController.deleteUserProfile);

// OneToMany -- ManyToOne
const authorController = new AuthorController();
app.post("/create-authors", authorController.createAuthor);
app.get("/get-authors", authorController.getAllAuthors);
app.get("/get-book-by-author", authorController.getBooksByAuthor);

// ManyToMany relationship
const studentController = new StudentController();
app.post("/create-student", studentController.createStudent);
app.post("/enroll-courses", studentController.addCourseToStudent);
app.post("create-course", studentController.enrolledCourse);
app.get("/students", studentController.getStudents);
app.get("/courses", studentController.getCourses);
// Get courses by student ID
app.get(
  "/students/:studentId/courses",
  studentController.getCoursesByStudentId
);
// Get students by course ID
app.get("/courses/:courseId/students", studentController.getStudentsByCourseId);

app.post("/add-enrollement-date", studentController.createEnrollment);
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
