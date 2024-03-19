import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Delivery } from "./delivery.model";

@Table({tableName: "deliveryRoute"})
export class DeliveryRoute extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "deliveryId"})
  deliveryId?: string;

  @Column({type: DataType.INTEGER, field: "ordem"})
  ordem?: number;

  @Column({type: DataType.DATE, field: "entregue"})
  entregue?: Date;

  @Column({type: DataType.DATE, field: "cancelado"})
  cancelado?: Date;

  @BelongsTo(() => Delivery, 'deliveryId')
  delivery?: Delivery;

}