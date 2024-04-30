import { Router } from "express";
import OrderController from "../../controllers/sales/order.controller";

class orderRoutes {
  router = Router();
  controller = new OrderController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/deliveryList", (req, res) => this.controller.deliveryList(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/deliveryman", (req, res) => this.controller.deliveryman(req, res));
    this.router.post("/delivery", (req, res) => this.controller.delivery(req, res));
    this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new orderRoutes().router;