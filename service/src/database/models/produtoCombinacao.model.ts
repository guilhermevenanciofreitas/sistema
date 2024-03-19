import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "produtoCombinacao"})
export class ProdutoCombinacao extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "produtoId"})
  produtoId?: string;

  @Column({type: DataType.UUID, field: "combinacaoId"})
  combinacaoId?: string;

}