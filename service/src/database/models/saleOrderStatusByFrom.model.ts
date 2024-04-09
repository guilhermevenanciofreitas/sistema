import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "saleOrderStatusByFrom"})
export class SaleOrderStatusByFrom extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "statusById"})
  statusById?: string;

  @Column({type: DataType.UUID, field: "statusFromId"})
  statusFromId?: string;
  
}