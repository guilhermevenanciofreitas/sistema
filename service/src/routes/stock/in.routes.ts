import { Router } from "express";
import StockInController from "../../controllers/stock/in.controller";

class stockInRoutes {
  router = Router();
  controller = new StockInController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/check-in", (req, res) => this.controller.checkIn(req, res));
    this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new stockInRoutes().router;