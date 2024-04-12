import { Router } from "express";
import FreightQuoteController from "../../controllers/logistic/freightQuote.controller";

class FreightQuoteRoutes {
  router = Router();
  controller = new FreightQuoteController();

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

export default new FreightQuoteRoutes().router;