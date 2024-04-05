import { Router } from "express";
import ParceiroController from "../../controllers/registrations/parceiro.controller";

class ClienteRoutes {
  router = Router();
  controller = new ParceiroController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res, "isCliente"));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res, "isCliente"));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    //this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new ClienteRoutes().router;