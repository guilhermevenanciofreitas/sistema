import { Router } from "express";
import ProgressController from "../../controllers/sales/progress.controller";

class progressRoutes {
  router = Router();
  controller = new ProgressController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/progress", (req, res) => this.controller.progress(req, res));
  }
}

export default new progressRoutes().router;