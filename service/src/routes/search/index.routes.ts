import { Router } from "express";
import SearchController from "../../controllers/search";

class SearchRoutes {
  router = Router();
  controller = new SearchController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/tabelasPreco", (req, res) => this.controller.tabelasPreco(req, res));
    this.router.post("/cliente", (req, res) => this.controller.cliente(req, res));
    this.router.post("/produto", (req, res) => this.controller.produto(req, res));
    this.router.post("/municipio", (req, res) => this.controller.municipio(req, res));
  }
}

export default new SearchRoutes().router;