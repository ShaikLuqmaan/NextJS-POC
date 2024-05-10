import { Request, Response } from "express";
import fetch from "node-fetch";
import { myDataSource } from "../app-data-source";
import { Data } from "../entity/data.entity";

export interface ApiResponse {
  success: boolean;
  data: Array<DecimalData>;
}

export interface DecimalData {
  decimalValue: number;
  name: string;
}

export class MockController {
  // Get data from third party API
  fetchData = async (req: Request, res: Response) => {
    try {
      const response = await fetch("http://localhost:3000/mockdata");
      const data = await response.json();
      return data;
    } catch (error) {
      res.status(500).send("Error: " + error.message);
      return null;
    }
  };

  // Middleware to process data
  parseData = (response: ApiResponse): DecimalData[] => {
    if (!response.success) {
      throw new Error("API error");
    }

    console.log("Response", response);
    return response.data.map((item) => ({
      decimalValue: parseFloat(item.decimalValue.toPrecision(10)),
      name: item.name,
    }));
  };

  // Save the Data to DB
  saveData = async (req: Request, res: Response) => {
    try {
      const apiResponse = await this.fetchData(req, res);
      if (!apiResponse) {
        throw new Error("Failed to get data");
      }
      const parsedData = this.parseData(apiResponse as ApiResponse);

      const dataRepository = myDataSource.getRepository(Data);
      const savePromises = [];

      parsedData.forEach((dataItem) => {
        const data = dataRepository.create(dataItem);
        const savePromise = dataRepository.save(data);
        savePromises.push(savePromise);
      });

      await Promise.all(savePromises);

      res.json({ message: "Data saved" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error: " + error.message });
    }
  };

  getData = async (req: Request, res: Response) => {
    const data = await myDataSource.manager.find(Data);
    res.json(data);
  };
}
