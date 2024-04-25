import { Router } from "express";
import SearchController from "../../controllers/search";

class SearchRoutes {
  router = Router();
  controller = new SearchController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {

    this.router.post("/company", (req, res) => this.controller.company(req, res));

    this.router.post("/tabelasPreco", (req, res) => this.controller.tabelasPreco(req, res));

    this.router.post("/partner", (req, res) => this.controller.partner(req, res));
    this.router.post("/costumer", (req, res) => this.controller.costumer(req, res));
    this.router.post("/employee", (req, res) => this.controller.employee(req, res));
    
    
    this.router.post("/bank", (req, res) => this.controller.bank(req, res));
    this.router.post("/bank-account", (req, res) => this.controller.bankAccount(req, res));

    this.router.post("/municipio", (req, res) => this.controller.municipio(req, res));
    this.router.post("/payment-form", (req, res) => this.controller.paymentForm(req, res));
    this.router.post("/sale-order-shipping-type", (req, res) => this.controller.saleOrderShippingType(req, res));

    this.router.post("/product", (req, res) => this.controller.product(req, res));
    this.router.post("/product-category", (req, res) => this.controller.productCategory(req, res));

    this.router.post("/product-combination-group", (req, res) => this.controller.productCombinationGroup(req, res));

    this.router.post("/called-occurrence", (req, res) => this.controller.calledOccurrence(req, res));

    this.router.post("/freight-calculation-type", (req, res) => this.controller.freightCalculationType(req, res));
    
    this.router.post("/meso-region", (req, res) => this.controller.mesoRegion(req, res));

  }
}

export default new SearchRoutes().router;