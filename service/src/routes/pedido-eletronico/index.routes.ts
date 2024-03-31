import { Router } from "express";
import IndexController from "../../controllers/pedido-eletronico";

class pedidoEletronicoRoutes {
  router = Router();
  controller = new IndexController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/load", this.controller.load);
  }
}

export default new pedidoEletronicoRoutes().router;