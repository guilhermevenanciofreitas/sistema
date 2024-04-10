import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { BankAccount } from "./bankAccount.model";

@Table({tableName: "calledOccurrence"})
export class CalledOccurrence extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(80), field: "description"})
  description?: string;

  @Column({type: DataType.INTEGER, field: "day"})
  day?: number;

  @Column({type: DataType.INTEGER, field: "hour"})
  hour?: number;

  @Column({type: DataType.INTEGER, field: "minute"})
  minute?: number;

}