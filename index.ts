import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./src/routes/product.route";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
app.use(productRouter);

//Start server
const startExpressServer = async () => {
  const db = await connectToDb();
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  });
};

startExpressServer();
