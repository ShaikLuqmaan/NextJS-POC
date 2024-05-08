import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Product } from "../entity/product.entity";

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const location = req.body.location;
      const locationPoint = `(${location.x}, ${location.y})`;

      const productData = {
        ...req.body,
        location: locationPoint,
      };

      const product = await myDataSource.manager
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values([productData])
        .execute();

      res.send({
        message: "Product successfully created",
        product: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error in creating the product: ${error.message}`);
    }
  }
  async createProductWithImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).send("Image file is required.");
      }
      const productData = {
        ...req.body,
        imageData: req.file.buffer,
      };

      const product = await myDataSource.manager
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values([productData])
        .execute();

      res.send({
        message: "Product with image successfully created",
        product: product,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`Error in creating the product with image: ${error.message}`);
    }
  }
  async getProducts(req: Request, res: Response) {
    try {
      // Query Builder
      const isActive = req.query.isActive;
      let products;

      if (isActive != undefined) {
        products = await myDataSource.manager
          .createQueryBuilder(Product, "product")
          .where("product.isActive = :isActive", {
            isActive,
          })
          .getMany();
      } else {
        products = await myDataSource.manager
          .createQueryBuilder(Product, "product")
          .getMany();
      }

      if (products) {
        res.send(products);
      } else {
        res.status(404).send("Active Product not found.");
      }
    } catch (error) {
      res.status(500).send("Error in getting active products.");
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.id);

      const product = await myDataSource.manager
        .createQueryBuilder(Product, "product")
        .where("product.id = :productId", { productId })
        .getOne();

      if (product) {
        res.send(product);
      } else {
        res.status(404).send("Product not found.");
      }
    } catch (error) {
      res.status(500).send("Error in getting the product.");
    }
  }
}
