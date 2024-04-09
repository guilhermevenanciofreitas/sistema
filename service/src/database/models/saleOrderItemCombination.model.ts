import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { PedidoVendaItemCombinacaoItem } from "./pedidoVendaItemCombinacaoItem.model";

@Table({tableName: "saleOrderItemCombination"})
export class SaleOrderItemCombination extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "saleOrderItemId"})
  saleOrderItemId?: string;

  @Column({type: DataType.UUID, field: "combinationId"})
  combinationId?: string;

  @HasMany(() => PedidoVendaItemCombinacaoItem, { onDelete: 'cascade', foreignKey: 'pedidoVendaItemCombinacaoId' })
  combinacaoItems?: PedidoVendaItemCombinacaoItem[];

}