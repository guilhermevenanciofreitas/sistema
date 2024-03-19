import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "produtoCombinacaoItem"})
export class ProdutoCombinacaoItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "combinacaoId"})
  combinacaoId?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

}