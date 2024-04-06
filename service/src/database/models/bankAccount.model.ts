import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Bank } from "./bank.model";

@Table({tableName: "bankAccount"})
export class BankAccount extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "bankId"})
  bankId?: string;

  @BelongsTo(() => Bank, 'bankId')
  bank?: Bank;

}