"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = exports.Usuario = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const usuario_model_1 = require("./models/usuario.model");
const empresa_model_1 = require("./models/empresa.model");
var usuario_model_2 = require("./models/usuario.model");
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return usuario_model_2.Usuario; } });
var empresa_model_2 = require("./models/empresa.model");
Object.defineProperty(exports, "Empresa", { enumerable: true, get: function () { return empresa_model_2.Empresa; } });
class Sequelize {
    constructor(options) {
        this.connectToDatabase(options);
    }
    connectToDatabase(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, options), { dialect: "postgres", define: { timestamps: false }, models: [empresa_model_1.Empresa, usuario_model_1.Usuario] }));
            yield this.sequelize
                .authenticate()
                .then(() => {
                console.log("Connection has been established successfully.");
            })
                .catch((err) => {
                console.error("Unable to connect to the Database:", err);
            });
        });
    }
}
exports.default = Sequelize;
