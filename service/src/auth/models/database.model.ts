import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "databases"})
export class Database extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING, field: "host"})
  host?: string;

  @Column({type: DataType.STRING, field: "username"})
  username?: string;

  @Column({type: DataType.STRING, field: "password"})
  password?: string;

  @Column({type: DataType.STRING, field: "database"})
  database?: string;

}