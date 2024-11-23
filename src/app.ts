import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bikeRoutes } from "./app/modules/bike/bike.route";
import { orderRoutes } from "./app/modules/order/roder.route";
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use("/api/products", bikeRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
