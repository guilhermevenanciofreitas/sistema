import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Produto } from "./produto.model";
import { PedidoVendaItemCombinacao } from "./pedidoVendaItemCombinacao.model";

@Table({tableName: "pedidoVendaItem"})
export class PedidoVendaItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "pedidoVendaId"})
  pedidoVendaId?: string;

  @Column({type: DataType.UUID, field: "produtoId"})
  produtoId?: string;

  @Column({type: DataType.DECIMAL(10, 3), field: "quantidade"})
  quantidade?: number;

  @Column({type: DataType.DECIMAL(10, 2), field: "valor"})
  valor?: number;

  @BelongsTo(() => Produto, 'produtoId')
  produto?: Produto;

  @HasMany(() => PedidoVendaItemCombinacao, 'pedidoVendaItemId')
  itemCombinacoes?: PedidoVendaItemCombinacao[];

}