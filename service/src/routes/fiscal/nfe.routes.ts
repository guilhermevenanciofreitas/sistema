import { Router } from "express";
import NfeController from "../../controllers/fiscal/nfe.controller";

class NfeRoutes {
  router = Router();
  controller = new NfeController();

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

export default new NfeRoutes().router;