import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "users"})
export class User extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "email"})
  email?: string;

  @Column({type: DataType.STRING(30), field: "password"})
  password?: string;

}