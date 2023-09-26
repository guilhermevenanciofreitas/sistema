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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const database_1 = require("../database");
const crypto_1 = __importDefault(require("crypto"));
class UsuarioService {
}
exports.UsuarioService = UsuarioService;
_a = UsuarioService;
UsuarioService.Add = (usuario, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const id = usuario.id ? yield database_1.Usuario.findOne({ where: { id: usuario.id }, transaction }) : undefined;
    if (!id) {
        usuario.id = crypto_1.default.randomUUID();
        yield database_1.Usuario.create(Object.assign({}, usuario), { transaction });
    }
    else {
        yield database_1.Usuario.update(usuario, { where: { id: usuario.id }, transaction });
    }
});
UsuarioService.Delete = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.Usuario.update({ ativo: false }, { where: { id: id }, transaction });
});
