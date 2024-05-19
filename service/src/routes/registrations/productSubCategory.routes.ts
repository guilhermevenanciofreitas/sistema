import { Router } from "express";
import ProductSubCategoryController from "../../controllers/registrations/productSubCategory.controller";

class ProductSubCategoryRoutes {

  router = Router();
  controller = new ProductSubCategoryController();

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

export default new ProductSubCategoryRoutes().router;