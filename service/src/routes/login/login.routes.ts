import { Router } from "express";
import LoginController from "../../controllers/login/login.controller";

class LoginRoutes {
  router = Router();
  controller = new LoginController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/signin", this.controller.signin);
    this.router.post("/signout", this.controller.signout);
  }
}

export default new LoginRoutes().router;