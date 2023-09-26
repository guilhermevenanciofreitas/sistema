"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../../controllers/cadastros/usuario.controller"));
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new usuario_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/test", this.controller.test);
        this.router.post("/findAll", this.controller.findAll);
        this.router.post("/findOne", this.controller.findOne);
        this.router.post("/create", this.controller.create);
        this.router.post("/delete", this.controller.delete);
    }
}
exports.default = new UsuarioRoutes().router;
