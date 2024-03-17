import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "delivery"})
export class Delivery extends Model {
  
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id"})
  id?: number;

  @Column({type: DataType.UUID, field: "entregadorId"})
  entregadorId?: string;

}