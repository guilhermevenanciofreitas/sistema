"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_routes_1 = __importDefault(require("./login/login.routes"));
const usuario_routes_1 = __importDefault(require("./cadastros/usuario.routes"));
class Routes {
    constructor(app) {
        app.use("/api/login", login_routes_1.default);
        app.use("/api/usuario", usuario_routes_1.default);
    }
}
exports.default = Routes;
