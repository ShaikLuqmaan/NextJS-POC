import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "testdb",
  synchronize: true,
  logging: false,
  // Production build
  entities: ["dist/entity/**/*.js"],
});
