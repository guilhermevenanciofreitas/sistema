import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Parceiro } from "./parceiro.model";
import { pedidoVendaItem } from "./pedidoVendaItem.model";

@Table({tableName: "pedidoVenda"})
export class PedidoVenda extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "clienteId"})
  clientId?: string;

  @Column({type: DataType.JSONB, field: "entrega"})
  entrega?: object;

  @BelongsTo(() => Parceiro, 'clienteId')
  cliente?: Parceiro;

  @HasMany(() => pedidoVendaItem, 'pedidoVendaId')
  itens?: pedidoVendaItem[];

}