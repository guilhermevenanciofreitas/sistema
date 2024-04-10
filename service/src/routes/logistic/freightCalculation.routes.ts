import { Router } from "express";
import FreightCalculationController from "../../controllers/logistic/freightCalculation.controller";

class FreightCalculationRoutes {
  router = Router();
  controller = new FreightCalculationController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
  
}

export default new FreightCalculationRoutes().router;