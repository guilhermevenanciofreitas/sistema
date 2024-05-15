import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "measurementUnit"})
export class MeasurementUnit extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(50), field: "name"})
  name?: string;

  @Column({type: DataType.STRING(20), field: "surname"})
  surname?: string;

}