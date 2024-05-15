import { Router } from "express";
import PartnerController from "../../controllers/registrations/partner.controller";

class SupplierRoutes {
  router = Router();
  controller = new PartnerController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res, "isSupplier"));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res, "isSupplier"));
    this.router.post("/consult", (req, res) => this.controller.consult(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    //this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new SupplierRoutes().router;