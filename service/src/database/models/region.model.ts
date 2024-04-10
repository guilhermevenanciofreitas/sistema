import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "region"})
export class Region extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

}