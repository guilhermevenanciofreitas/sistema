import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { SaleOrder } from "./saleOrder.model";
import { DeliveryRoute } from "./deliveryRoute.model";

@Table({tableName: "saleOrderDeliveryRoute"})
export class SaleOrderDeliveryRoute extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "saleOrderId"})
  saleOrderId?: string;

  @Column({type: DataType.UUID, field: "deliveryRouteId"})
  deliveryRouteId?: string;

  @BelongsTo(() => SaleOrder, {as: 'saleOrder', foreignKey: 'saleOrderId'})
  saleOrder?: SaleOrder;

  @BelongsTo(() => DeliveryRoute, 'deliveryRouteId')
  deliveryRoute?: DeliveryRoute;

}