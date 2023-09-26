"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_password = exports.db_user = exports.db_name = exports.db_port = exports.db_host = void 0;
exports.db_host = String(process.env.DB_HOST);
exports.db_port = Number(process.env.DB_PORT);
exports.db_name = String(process.env.DB_NAME);
exports.db_user = String(process.env.DB_USER);
exports.db_password = String(process.env.DB_PASSWORD);
