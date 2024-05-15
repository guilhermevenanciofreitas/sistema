import { Router } from "express";
import CepController from "../../controllers/cep";

class CepRoutes {
  router = Router();
  controller = new CepController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/consult", (req, res) => this.controller.consult(req, res));
  }
}

export default new CepRoutes().router;