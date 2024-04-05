import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "database"})
export class Database extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(50), field: "host"})
  host?: string;

  @Column({type: DataType.STRING(30), field: "username"})
  username?: string;

  @Column({type: DataType.STRING(30), field: "password"})
  password?: string;

  @Column({type: DataType.STRING(80), field: "database"})
  database?: string;

}