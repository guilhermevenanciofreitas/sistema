import { Router } from "express";
import ShippingController from "../../controllers/financial/shipping.controller";

class ShippingRoutes {
  router = Router();
  controller = new ShippingController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/unshipping", (req, res) => this.controller.unShipping(req, res));
  }
}

export default new ShippingRoutes().router;