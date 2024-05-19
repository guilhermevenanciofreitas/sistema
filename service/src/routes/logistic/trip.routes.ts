import { Router } from "express";
import TripController from "../../controllers/logistic/trip.controller";

class TripRoutes {
  router = Router();
  controller = new TripController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/emission", (req, res) => this.controller.emission(req, res));
    this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
  
}

export default new TripRoutes().router;