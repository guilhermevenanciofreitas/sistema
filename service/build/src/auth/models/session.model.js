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
exports.Session = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const index_1 = require("../index");
let Session = class Session extends sequelize_typescript_1.Model {
};
exports.Session = Session;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, field: "userId" }),
    __metadata("design:type", String)
], Session.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, field: "accountId" }),
    __metadata("design:type", String)
], Session.prototype, "accountId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, field: "lastAcess" }),
    __metadata("design:type", Date)
], Session.prototype, "lastAcess", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => index_1.User, { foreignKey: 'userId', targetKey: 'id' }),
    __metadata("design:type", index_1.User)
], Session.prototype, "Database", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => index_1.Account, { foreignKey: 'accountId', targetKey: 'id' }),
    __metadata("design:type", index_1.Account)
], Session.prototype, "Account", void 0);
exports.Session = Session = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "sessions" })
], Session);
