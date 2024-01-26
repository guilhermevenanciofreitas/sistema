import { Sequelize as sequelize } from "sequelize-typescript";

import { TabelaPreco } from "./models/tabelaPreco.model";
import { Usuario } from "./models/usuario.model";
import { Parceiro } from "./models/parceiro.model";
import { Produto } from "./models/produto.model";
import { Servico } from "./models/servico.model";
import { Empresa } from "./models/empresa.model";

export { TabelaPreco } from "./models/tabelaPreco.model";
export { Parceiro } from "./models/parceiro.model";
export { Produto } from "./models/produto.model";
export { Servico } from "./models/servico.model";
export { Empresa } from "./models/empresa.model";
export { Usuario } from "./models/usuario.model";

export default class Sequelize {
  
  public sequelize: sequelize | undefined;

  constructor(options: any) {
    this.sequelize = new sequelize({
      ...options,
      
      dialect: "postgres",
      define: {timestamps: false},
      models: [Empresa, Parceiro, Produto, Servico, Usuario, TabelaPreco],
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });
  }

}