"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const accounts_1 = __importDefault(require("../../auth/accounts"));
const crypto_1 = __importDefault(require("crypto"));
const index_1 = require("../../auth/index");
const database_1 = __importStar(require("../../database"));
class LoginController {
    //200 - autorizado
    //201 - requer informar account
    //202 - requer informar empresa
    signin(req, res) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let accountId = req.body.accountId;
                let empresaId = req.body.empresaId;
                const Accounttransaction = yield ((_a = new accounts_1.default().sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
                const user = yield index_1.User.findOne({ attributes: ["id", "email", "password"], where: { email: req.body.email, password: req.body.password }, transaction: Accounttransaction });
                if (accountId == "") {
                    const accountsUsers = yield index_1.AccountUser.findAll({ include: [index_1.Account], where: { userId: user === null || user === void 0 ? void 0 : user.id }, transaction: Accounttransaction });
                    if (accountsUsers.length > 1) {
                        let accounts = [];
                        for (let i = 0; i < accountsUsers.length; i++) {
                            accounts.push(accountsUsers[i].Account);
                        }
                        res.status(201).json(accounts);
                        return;
                    }
                    accountId = accountsUsers[0].accountId;
                }
                const account = yield index_1.Account.findOne({ include: [index_1.Database], where: { id: accountId }, transaction: Accounttransaction });
                const transaction = yield ((_f = new database_1.default({
                    host: (_b = account === null || account === void 0 ? void 0 : account.Database) === null || _b === void 0 ? void 0 : _b.host,
                    username: (_c = account === null || account === void 0 ? void 0 : account.Database) === null || _c === void 0 ? void 0 : _c.username,
                    password: (_d = account === null || account === void 0 ? void 0 : account.Database) === null || _d === void 0 ? void 0 : _d.password,
                    database: (_e = account === null || account === void 0 ? void 0 : account.Database) === null || _e === void 0 ? void 0 : _e.database
                }).sequelize) === null || _f === void 0 ? void 0 : _f.transaction());
                if (empresaId == "") {
                    const empresas = yield database_1.Empresa.findAll({ transaction: transaction });
                    if (empresas.length > 1) {
                        res.status(202).json(empresas);
                        return;
                    }
                    empresaId = empresas[0].id;
                }
                const session = yield index_1.Session.create({ id: crypto_1.default.randomUUID(), userId: user === null || user === void 0 ? void 0 : user.id, accountId: accountId, lastAcess: new Date() }, { transaction: Accounttransaction });
                Accounttransaction === null || Accounttransaction === void 0 ? void 0 : Accounttransaction.commit();
                const usuario = yield database_1.Usuario.findOne({ where: { id: user === null || user === void 0 ? void 0 : user.id }, transaction: transaction });
                const empresa = yield database_1.Empresa.findOne({ where: { id: empresaId }, transaction: transaction });
                res.status(200).json({ id: session === null || session === void 0 ? void 0 : session.id, usuario: usuario, empresa: empresa, lastAcess: (_g = session === null || session === void 0 ? void 0 : session.lastAcess) === null || _g === void 0 ? void 0 : _g.toLocaleString('en'), expiresIn: index_1.minutes });
            }
            catch (err) {
                res.status(500).json({
                    message: err
                });
            }
        });
    }
    signout(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const transaction = yield ((_a = new accounts_1.default().sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
                yield index_1.Session.destroy({ where: { id: id }, transaction });
                transaction === null || transaction === void 0 ? void 0 : transaction.commit();
                res.status(200).json({ message: "signout success!" });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
}
exports.default = LoginController;
