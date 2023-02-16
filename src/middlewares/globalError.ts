import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export async function notFound(req: Request, res: Response) {
  res.status(404).send({ message: "Not found, Route does not exist" });
}

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "dev") {
    console.error(err);
  } else if (process.env.NODE_ENV === "prod") {
    //Handle mongoose validation and inavlid ids
    if (err instanceof mongoose.Error.ValidationError) {
      const errors: any = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      res.status(422).json({ errors });
    } else if (
      err instanceof mongoose.Error.CastError &&
      err.kind === "ObjectId"
    ) {
      res.status(422).json({ message: "Invalid ID" });
    } else {
      console.error(err);
      res.status(500).send({ message: "Internal Server error" });
    }
  }
}
