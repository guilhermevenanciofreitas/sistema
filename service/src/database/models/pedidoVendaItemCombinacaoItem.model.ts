import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { ProdutoCombinacaoItem } from "./produtoCombinacaoItem.model";
import { SaleOrderItemCombination } from "./saleOrderItemCombination.model";

@Table({tableName: "pedidoVendaItemCombinacaoItem"})
export class PedidoVendaItemCombinacaoItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "pedidoVendaItemCombinacaoId"})
  pedidoVendaItemCombinacaoId?: string;

  @Column({type: DataType.UUID, field: "itemCombinacaoId"})
  itemCombinacaoId?: string;

  @Column({type: DataType.UUID, field: "quantidade"})
  quantidade?: number;

  @BelongsTo(() => SaleOrderItemCombination, 'pedidoVendaItemCombinacaoId')
  pedidoVendaItemCombinacao?: SaleOrderItemCombination;

}