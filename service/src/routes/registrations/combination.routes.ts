import { Router } from "express";
import CombinationController from "../../controllers/registrations/combination.controller";

class CombinationRoutes {

  router = Router();
  controller = new CombinationController();

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

export default new CombinationRoutes().router;