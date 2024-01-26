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
  }
}

export default new SearchRoutes().router;