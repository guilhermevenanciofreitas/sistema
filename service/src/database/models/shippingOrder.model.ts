import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";

@Table({tableName: "shippingOrder"})
export class ShippingOrder extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

}