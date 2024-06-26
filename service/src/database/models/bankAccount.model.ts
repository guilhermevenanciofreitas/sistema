import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Bank } from "./bank.model";

@Table({tableName: "bankAccount"})
export class BankAccount extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "bankId"})
  bankId?: string;

  @Column({type: DataType.STRING(4), field: "agency"})
  agency?: string;

  @Column({type: DataType.STRING(1), field: "agencyDigit"})
  agencyDigit?: string;

  @Column({type: DataType.STRING(20), field: "account"})
  account?: string;
  
  @Column({type: DataType.STRING(1), field: "accountDigit"})
  accountDigit?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: "balance"})
  balance?: string;

  @BelongsTo(() => Bank, {as: 'bank', foreignKey: 'bankId'})
  bank?: Bank;

}