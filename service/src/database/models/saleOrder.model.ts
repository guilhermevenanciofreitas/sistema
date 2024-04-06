import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Parceiro } from "./parceiro.model";
import { SaleOrderItem } from "./saleOrderItem.model";
import { PedidoVendaPagamento } from "./pedidoVendaPagamento.model";
import { SaleOrderStatus } from "./saleOrderStatus.model";
import { PedidoVendaTipoEntrega } from "./pedidoVendaTipoEntrega.model";
import { PedidoVendaDeliveryRoute } from "./pedidoVendaDeliveryRoute.model";

@Table({tableName: "saleOrder"})
export class SaleOrder extends Model {
  
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

  @BelongsTo(() => SaleOrderStatus, 'statusId')
  status?: SaleOrderStatus;

  @HasMany(() => SaleOrderItem, 'pedidoVendaId')
  itens?: SaleOrderItem[];

  @HasMany(() => PedidoVendaPagamento, 'pedidoVendaId')
  pagamentos?: PedidoVendaPagamento[];

  @BelongsTo(() => Parceiro, 'entregadorId')
  entregador?: Parceiro;

  @HasMany(() => PedidoVendaDeliveryRoute, 'pedidoVendaId')
  deliveryRoutes?: PedidoVendaDeliveryRoute[];

}