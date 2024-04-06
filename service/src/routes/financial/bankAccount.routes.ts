import { Router } from "express";
import PaymentController from "../../controllers/financial/payment.controller";

class BankAccountRoutes {
  router = Router();
  controller = new PaymentController();

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

export default new BankAccountRoutes().router;