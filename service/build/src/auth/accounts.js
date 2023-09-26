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
exports.Accounts = void 0;
const _1 = require(".");
const sequelize_typescript_1 = require("sequelize-typescript");
class Accounts {
    constructor() {
        this.connectToDatabase();
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_typescript_1.Sequelize({
                database: "accounts",
                username: "guilherme",
                password: "@Rped94ft",
                host: "66.70.245.150",
                dialect: "postgres",
                timezone: "America/Sao_Paulo",
                pool: {
                //max: config.pool.max,
                //min: config.pool.min,
                //acquire: config.pool.acquire,
                //idle: config.pool.idle
                },
                define: { timestamps: false },
                models: [_1.Account, _1.AccountUser, _1.Database, _1.Session, _1.User]
            });
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
exports.Accounts = Accounts;
exports.default = Accounts;
