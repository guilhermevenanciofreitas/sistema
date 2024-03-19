import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ProdutoCombinacao } from "./produtoCombinacao.model";

@Table({tableName: "produtos"})
export class Produto extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

  @Column({type: DataType.BOOLEAN, field: "isCombinacao"})
  isCombinacao?: string;

  @HasMany(() => ProdutoCombinacao, 'produtoId')
  combinacoes?: ProdutoCombinacao[];

}