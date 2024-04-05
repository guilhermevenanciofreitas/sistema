import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Database } from "../index";


@Table({tableName: "account"})
export class Account extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(80), field: "name"})
  name?: string;

  @Column({type: DataType.UUID, field: "databaseId"})
  databaseId?: string;

  @BelongsTo(() => Database, {foreignKey: 'databaseId', targetKey: 'id'})
  Database?: Database;

}