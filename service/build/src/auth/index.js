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
exports.minutes = exports.Database = exports.User = exports.AccountUser = exports.Account = exports.Session = exports.Accounts = void 0;
const accounts_1 = __importDefault(require("./accounts"));
const session_model_1 = require("./models/session.model");
const account_model_1 = require("./models/account.model");
const database_model_1 = require("./models/database.model");
var accounts_2 = require("./accounts");
Object.defineProperty(exports, "Accounts", { enumerable: true, get: function () { return accounts_2.Accounts; } });
var session_model_2 = require("./models/session.model");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_model_2.Session; } });
var account_model_2 = require("./models/account.model");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return account_model_2.Account; } });
var accountUser_model_1 = require("./models/accountUser.model");
Object.defineProperty(exports, "AccountUser", { enumerable: true, get: function () { return accountUser_model_1.AccountUser; } });
var user_model_1 = require("./models/user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
var database_model_2 = require("./models/database.model");
Object.defineProperty(exports, "Database", { enumerable: true, get: function () { return database_model_2.Database; } });
const database_1 = __importDefault(require("../database"));
exports.minutes = 60;
function Auth(req, res) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield ((_a = new accounts_1.default().sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
        try {
            const session = yield session_model_1.Session.findOne({ include: [{ model: account_model_1.Account, include: [database_model_1.Database] }], where: { id: req.headers.authorization }, transaction });
            if (!session) {
                res.status(401).json({ message: "Session expired!" });
                return;
            }
            if (session === null || session === void 0 ? void 0 : session.lastAcess) {
                const endAt = new Date(((_b = session === null || session === void 0 ? void 0 : session.lastAcess) === null || _b === void 0 ? void 0 : _b.getTime()) + exports.minutes * 60000);
                if (endAt <= new Date()) //Verificar se token ainda e válido
                 {
                    res.status(401).json({ message: "Session expired!" });
                    return;
                }
            }
            const lastAcess = new Date();
            yield session.update({ lastAcess: lastAcess, transaction });
            res.setHeader("Last-Acess", lastAcess.toLocaleString('en'));
            res.setHeader("Expires-In", exports.minutes);
            const config = (_c = session === null || session === void 0 ? void 0 : session.Account) === null || _c === void 0 ? void 0 : _c.Database;
            transaction === null || transaction === void 0 ? void 0 : transaction.commit();
            return yield ((_d = new database_1.default({
                host: config === null || config === void 0 ? void 0 : config.host,
                username: config === null || config === void 0 ? void 0 : config.username,
                password: config === null || config === void 0 ? void 0 : config.password,
                database: config === null || config === void 0 ? void 0 : config.database
            }).sequelize) === null || _d === void 0 ? void 0 : _d.transaction());
        }
        catch (err) {
            transaction === null || transaction === void 0 ? void 0 : transaction.rollback();
            res.status(500).json({ message: err });
            return;
        }
    });
}
exports.default = Auth;
