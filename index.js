import express from "express";
import * as dotenv from "dotenv";
import myPreciousRouter from "./routes/myPrecious.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/joyas", myPreciousRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`funcionando en: http://localhost:${PORT}/joyas`);
});
