import { Router } from "express";
import NfeController from "../../controllers/fiscal/nfe.controller";
import DistribuitionController from "../../controllers/fiscal/distribuition.controller";

class DistribuitionRoutes {
  router = Router();
  controller = new DistribuitionController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/interest", (req, res) => this.controller.interest(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new DistribuitionRoutes().router;