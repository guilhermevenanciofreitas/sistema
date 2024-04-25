import { Router } from "express";
import InvoicingController from "../../controllers/sales/invoicing.controller";

class invoicingRoutes {
  router = Router();
  controller = new InvoicingController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
  }
}

export default new invoicingRoutes().router;