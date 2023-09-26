"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const index_1 = require("../index");
let Account = class Account extends sequelize_typescript_1.Model {
};
exports.Account = Account;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(80), field: "name" }),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, field: "databaseId" }),
    __metadata("design:type", String)
], Account.prototype, "databaseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => index_1.Database, { foreignKey: 'databaseId', targetKey: 'id' }),
    __metadata("design:type", index_1.Database)
], Account.prototype, "Database", void 0);
exports.Account = Account = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "accounts" })
], Account);
