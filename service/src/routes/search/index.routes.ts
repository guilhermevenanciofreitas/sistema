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
    this.router.post("/funcionario", (req, res) => this.controller.funcionario(req, res));
    this.router.post("/product", (req, res) => this.controller.product(req, res));
    this.router.post("/municipio", (req, res) => this.controller.municipio(req, res));
    this.router.post("/formaPagamento", (req, res) => this.controller.formaPagamento(req, res));
    this.router.post("/tipoEntrega", (req, res) => this.controller.tipoEntrega(req, res));
    this.router.post("/produtoCategoria", (req, res) => this.controller.produtoCategoria(req, res));
    this.router.post("/produtoCombinacaoGrupo", (req, res) => this.controller.produtoCombinacaoGrupo(req, res));
  }
}

export default new SearchRoutes().router;