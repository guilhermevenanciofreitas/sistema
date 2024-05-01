import { Router } from "express";
import ConfiguracaoController from "../../controllers/configuracao";
import multer from "multer";

class configuracaoRoutes {
  router = Router();
  controller = new ConfiguracaoController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/certificate", (req, res) => this.controller.certificate(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
  }
}

export default new configuracaoRoutes().router;