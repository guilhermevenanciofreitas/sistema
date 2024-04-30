import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { ShippingOrder } from "./shippingOrder.model";
import { Vehicle } from "./vehicle.model";

@Table({tableName: "shippingOrderVehicle"})
export class ShippingOrderVehicle extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "shippingOrderId"})
  shippingOrderId?: string;

  @Column({type: DataType.UUID, field: "vehicleId"})
  vehicleId?: string;

  @BelongsTo(() => ShippingOrder, {as: 'shippingOrder', foreignKey: 'shippingOrderId'})
  shippingOrder?: ShippingOrder;

  @BelongsTo(() => Vehicle, {as: 'vehicle', foreignKey: 'vehicleId'})
  vehicle?: Vehicle;

}