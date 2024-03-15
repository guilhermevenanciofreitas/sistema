import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Produto } from "./produto.model";

@Table({tableName: "pedidoVendaItem"})
export class pedidoVendaItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "produtoId"})
  produtoId?: string;

  @BelongsTo(() => Produto, 'produtoId')
  produto?: Produto;

}