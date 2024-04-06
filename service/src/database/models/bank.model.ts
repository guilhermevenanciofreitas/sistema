import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { BankAccount } from "./bankAccount.model";

@Table({tableName: "bank"})
export class Bank extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

  @HasMany(() => BankAccount, 'bankId')
  banks?: BankAccount[];

}