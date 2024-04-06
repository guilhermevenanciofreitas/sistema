import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { SaleOrder } from "./saleOrder.model";
import { DeliveryRoute } from "./deliveryRoute.model";

@Table({tableName: "pedidoVendaDeliveryRoute"})
export class PedidoVendaDeliveryRoute extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "pedidoVendaId"})
  pedidoVendaId?: string;

  @Column({type: DataType.UUID, field: "deliveryRouteId"})
  deliveryRouteId?: string;

  @BelongsTo(() => SaleOrder, 'pedidoVendaId')
  pedidoVenda?: SaleOrder;

  @BelongsTo(() => DeliveryRoute, 'deliveryRouteId')
  deliveryRoute?: DeliveryRoute;

}