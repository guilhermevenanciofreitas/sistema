import { Router } from "express";
import CteController from "../../controllers/fiscal/cte.controller";

class CteRoutes {
  router = Router();
  controller = new CteController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/xml", (req, res) => this.controller.xml(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    //this.router.post("/download-xml", (req, res) => this.controller.downloadXml(req, res));
    this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new CteRoutes().router;