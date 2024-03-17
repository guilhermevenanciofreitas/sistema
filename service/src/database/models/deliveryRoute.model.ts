import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "deliveryRoute"})
export class DeliveryRoute extends Model {
  
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id"})
  id?: number;

  @Column({type: DataType.UUID, field: "deliveryId"})
  deliveryId?: string;

  @Column({type: DataType.INTEGER, field: "ordem"})
  ordem?: number;

  @Column({type: DataType.DATE, field: "entregue"})
  entregue?: number;

}