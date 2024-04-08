import { Router } from "express";
import BankAccountController from "../../controllers/financial/bankAccount.controller";

class BankAccountRoutes {
  router = Router();
  controller = new BankAccountController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/findAll", (req, res) => this.controller.findAll(req, res));
    this.router.post("/findOne", (req, res) => this.controller.findOne(req, res));
    this.router.post("/save", (req, res) => this.controller.save(req, res));
    this.router.post("/change-bank-account-payment", (req, res) => this.controller.changeBankAccountPayment(req, res));
    this.router.post("/delete", (req, res) => this.controller.delete(req, res));
  }
}

export default new BankAccountRoutes().router;