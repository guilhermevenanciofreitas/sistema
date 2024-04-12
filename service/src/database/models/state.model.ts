import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "state"})
export class State extends Model {
  
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id"})
  id?: number;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

  @Column({type: DataType.STRING(2), field: "acronym"})
  acronym?: string;

  @Column({type: DataType.INTEGER, field: "ibge"})
  ibge?: number;

}