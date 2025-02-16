import express from "express";
import mongoose from "mongoose";
import router from "./routes/blogpostRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const mongo_uri = process.env.MONGO_URL;

mongoose
  .connect(mongo_uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("error", err));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", router);

app.get("/", (_, res) => {
  res.send("Express on Vercel");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});

export default app;
