import { Router } from "express";
import ShippingOrderController from "../../controllers/logistic/shippingOrder.controller";

class ShippingOrderRoutes {
  router = Router();
  controller = new ShippingOrderController();

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

export default new ShippingOrderRoutes().router;