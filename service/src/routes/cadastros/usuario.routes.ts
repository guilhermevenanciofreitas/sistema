import { Router } from "express";
import UsuarioController from "../../controllers/cadastros/usuario.controller";

class UsuarioRoutes {
  router = Router();
  controller = new UsuarioController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", this.controller.findAll);
    this.router.post("/findOne", this.controller.findOne);
    this.router.post("/save", this.controller.save);
    this.router.post("/delete", this.controller.delete);
  }
}

export default new UsuarioRoutes().router;