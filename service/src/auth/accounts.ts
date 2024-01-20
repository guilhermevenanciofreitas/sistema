import { Account, AccountUser, Database, Session, User } from '.';
import { db_host, db_port, db_name, db_user, db_password } from './config';
import { Sequelize } from "sequelize-typescript";

export class Accounts {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: "auth",
      username: "postgres",
      password: "@Rped94ft",
      host: "localhost",
      dialect: "postgres",
      timezone: "America/Sao_Paulo",
      pool: {
        //max: config.pool.max,
        //min: config.pool.min,
        //acquire: config.pool.acquire,
        //idle: config.pool.idle
      },
      define: {timestamps: false},
      models: [Account, AccountUser, Database, Session, User]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err: any) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Accounts;