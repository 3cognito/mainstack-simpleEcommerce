import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import productRouter from "./src/routes/product.route";
import { errorHandler, notFound } from "./src/middlewares/globalError";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(400).send("<h2>Hi, this API is up and running...</h2>");
});

app.use(productRouter);
app.use(notFound);
app.use(errorHandler);

//Connect to database
const connectToDb = async () => {
  const uri =
    "mongodb+srv://Tommy:JTARPweG7AYsdVjQ@cluster0.gidll0n.mongodb.net/test"; //Fix into env file
  try {
    await mongoose.connect(uri);
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

//Start server
const startExpressServer = async () => {
  const db = await connectToDb();
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  });
};

startExpressServer();
