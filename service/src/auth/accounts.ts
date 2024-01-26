import { Account, AccountUser, Database, Session, User } from '.';
import { db_host, db_port, db_name, db_user, db_password } from './config';
import { Sequelize } from "sequelize-typescript";

export class Accounts {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.sequelize = new Sequelize({
      database: "auth",
      username: "postgres",
      password: "@Rped94ft",
      host: "localhost",
      dialect: "postgres",
      timezone: "America/Sao_Paulo",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      define: {timestamps: false},
      models: [Account, AccountUser, Database, Session, User]
    });
  }

}

export default Accounts;