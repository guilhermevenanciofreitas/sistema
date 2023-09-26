import { Sequelize as sequelize } from "sequelize-typescript";
import { Usuario } from "./models/usuario.model";
import { Empresa } from "./models/empresa.model";

export { Usuario } from "./models/usuario.model";
export { Empresa } from "./models/empresa.model";

export default class Sequelize {
  public sequelize: sequelize | undefined;

  constructor(options: any) {
    this.connectToDatabase(options);
  }

  private async connectToDatabase(options: any) {

    this.sequelize = new sequelize({
      ...options,
      dialect: "postgres",
      define: {timestamps: false},
      models: [Empresa, Usuario]
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