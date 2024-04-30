import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { ShippingOrder } from "./shippingOrder.model";
import { Nfe } from "./nfe.model";

@Table({tableName: "shippingOrderNfe"})
export class ShippingOrderNfe extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "shippingOrderId"})
  shippingOrderId?: string;

  @Column({type: DataType.UUID, field: "nfeId"})
  nfeId?: string;

  @BelongsTo(() => ShippingOrder, {as: 'shippingOrder', foreignKey: 'shippingOrderId'})
  shippingOrder?: ShippingOrder;

  @BelongsTo(() => Nfe, {as: 'nfe', foreignKey: 'nfeId'})
  nfe?: Nfe;

}