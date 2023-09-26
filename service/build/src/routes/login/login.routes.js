"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../../controllers/login/login.controller"));
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new login_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post("/signin", this.controller.signin);
        this.router.post("/signout", this.controller.signout);
    }
}
exports.default = new LoginRoutes().router;
