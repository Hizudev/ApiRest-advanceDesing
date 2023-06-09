import { Router } from "express";
import { myPreciousController } from "../controller/myPrecious.controller.js";
import { reportQuery } from "../middlewares/myPrecious.middleware.js";

const myPreciousRouter = Router();

myPreciousRouter.get("/", reportQuery, myPreciousController.inventory);
myPreciousRouter.get(
  "/filtros",
  reportQuery,
  myPreciousController.filterInventory
);
myPreciousRouter.get("/joya/:id", reportQuery, myPreciousController.product);

export default myPreciousRouter;
