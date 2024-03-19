import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Parceiro } from "./parceiro.model";
import { PedidoVendaItem } from "./pedidoVendaItem.model";
import { PedidoVendaPagamento } from "./pedidoVendaPagamento.model";
import { PedidoVendaStatus } from "./pedidoVendaStatus.model";
import { PedidoVendaTipoEntrega } from "./pedidoVendaTipoEntrega.model";
import { PedidoVendaDeliveryRoute } from "./pedidoVendaDeliveryRoute.model";

@Table({tableName: "pedidoVenda"})
export class PedidoVenda extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "clienteId"})
  clientId?: string;

  @Column({type: DataType.UUID, field: "statusId"})
  statusId?: string;

  @Column({type: DataType.UUID, field: "tipoEntregaId"})
  tipoEntregaId?: string;

  @Column({type: DataType.JSONB, field: "entrega"})
  entrega?: any;

  @Column({type: DataType.UUID, field: "entregadorId"})
  entregadorId?: string;

  
  @BelongsTo(() => Parceiro, 'clienteId')
  cliente?: Parceiro;

  @BelongsTo(() => PedidoVendaTipoEntrega, 'tipoEntregaId')
  tipoEntrega?: PedidoVendaTipoEntrega;

  @BelongsTo(() => PedidoVendaStatus, 'statusId')
  status?: PedidoVendaStatus;

  @HasMany(() => PedidoVendaItem, 'pedidoVendaId')
  itens?: PedidoVendaItem[];

  @HasMany(() => PedidoVendaPagamento, 'pedidoVendaId')
  pagamentos?: PedidoVendaPagamento[];

  @BelongsTo(() => Parceiro, 'entregadorId')
  entregador?: Parceiro;

  @HasMany(() => PedidoVendaDeliveryRoute, 'pedidoVendaId')
  deliveryRoutes?: PedidoVendaDeliveryRoute[];

}