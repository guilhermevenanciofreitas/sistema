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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../auth"));
const database_1 = require("../../database");
const usuario_service_1 = require("../../services/usuario.service");
class UsuarioController {
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('test');
            res.status(200).json({ message: "success!" });
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_1.default)(req, res).then((transaction) => __awaiter(this, void 0, void 0, function* () {
                const usuarios = yield database_1.Usuario.findAll({ attributes: ["id", "nome", "email"], transaction });
                res.status(200).json(usuarios);
            })).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_1.default)(req, res).then((transaction) => __awaiter(this, void 0, void 0, function* () {
                const usuario = yield database_1.Usuario.findOne({ attributes: ["id", "nome", "email"], where: { id: req.body.id }, transaction });
                res.status(200).json(usuario);
            })).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_1.default)(req, res).then((transaction) => __awaiter(this, void 0, void 0, function* () {
                const Usuario = req.body;
                if (Usuario.email == '') {
                    res.status(201).json({ message: 'Informe o e-mail!' });
                    return;
                }
                yield usuario_service_1.UsuarioService.Add(Usuario, transaction);
                yield (transaction === null || transaction === void 0 ? void 0 : transaction.commit());
                res.status(200).json(Usuario);
            })).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_1.default)(req, res).then((transaction) => __awaiter(this, void 0, void 0, function* () {
                yield usuario_service_1.UsuarioService.Delete(req.body.id, transaction);
                transaction === null || transaction === void 0 ? void 0 : transaction.commit();
            })).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
}
exports.default = UsuarioController;
