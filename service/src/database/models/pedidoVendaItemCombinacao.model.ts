import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { PedidoVendaItemCombinacaoItem } from "./pedidoVendaItemCombinacaoItem.model";

@Table({tableName: "pedidoVendaItemCombinacao"})
export class PedidoVendaItemCombinacao extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "pedidoVendaItemId"})
  pedidoVendaItemId?: string;

  @Column({type: DataType.UUID, field: "combinacaoId"})
  combinacaoId?: string;

  @HasMany(() => PedidoVendaItemCombinacaoItem, 'pedidoVendaItemCombinacaoId')
  combinacaoItems?: PedidoVendaItemCombinacaoItem[];

}