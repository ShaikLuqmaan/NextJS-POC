import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

interface User {
  id: number;
  name: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 24 },
  { id: 3, name: "Charlie", age: 27 },
];
app.get("/", (req, res) => {
  res.send("BobCat");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
