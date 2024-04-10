import { Router } from "express";
import CalledController from "../../controllers/relationship/called.controller";

class CalledRoutes {
  router = Router();
  controller = new CalledController();

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

export default new CalledRoutes().router;