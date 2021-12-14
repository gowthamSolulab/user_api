import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user/userRoutes";

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (error) => {
  console.log("Oh my god, something terrible happened: ", error);

  process.exit(1); // exit application
});

process.on("unhandledRejection", (error, promise) => {
  console.log(
    " Oh Lord! We forgot to handle a promise rejection here: ",
    promise
  );
  console.log(" The error was: ", error);
});

const app = express();
app.use(express.json());

app.use("/api/v1/users", router);

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`app runnning on port ${port}`));
