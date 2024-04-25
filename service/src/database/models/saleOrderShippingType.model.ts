import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "saleOrderShippingType"})
export class SaleOrderShippingType extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

}