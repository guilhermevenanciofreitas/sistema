import { Router } from "express";
import ParceiroController from "../../controllers/registrations/partner.controller";

class EmployeeRoutes {
  router = Router();
  controller = new ParceiroController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res, "isFuncionario"));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res, "isFuncionario"));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    //this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new EmployeeRoutes().router;