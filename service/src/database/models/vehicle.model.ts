import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "vehicle"})
export class Vehicle extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @Column({type: DataType.STRING(8), field: "plate"})
  plate?: string;

}