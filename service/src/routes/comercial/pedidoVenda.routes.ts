import { Router } from "express";
import PedidoVendaController from "../../controllers/comercial/pedidovenda.controller";

class PedidoVendaRoutes {
  router = Router();
  controller = new PedidoVendaController();

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

export default new PedidoVendaRoutes().router;