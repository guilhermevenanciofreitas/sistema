import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Cte } from "./cte.model";
import { Trip } from "./trip.model";
import { ShippingOrder } from "./shippingOrder.model";

@Table({tableName: 'tripShippingOrder'})
export class TripShippingOrder extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.UUID, field: 'tripId'})
  tripId?: string;

  @Column({type: DataType.UUID, field: 'shippingOrderId'})
  shippingOrderId?: string;

  @BelongsTo(() => Trip, {as: 'trip', foreignKey: 'tripId'})
  trip?: Trip;

  @BelongsTo(() => ShippingOrder, {as: 'shippingOrder', foreignKey: 'shippingOrderId'})
  shippingOrder?: ShippingOrder;

}