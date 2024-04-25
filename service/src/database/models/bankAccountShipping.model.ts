import { Model, Table, Column, DataType, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { Company } from "./company.model";
import { BankAccount } from "./bankAccount.model";
import { BankAccountShippingPayment } from "./bankAccountShippingPayment.model";

@Table({tableName: "bankAccountShipping"})
export class BankAccountShipping extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "companyId"})
  companyId?: string;

  @Column({type: DataType.UUID, field: "bankAccountId"})
  bankAccountId?: string;

  @Column({type: DataType.STRING(20), field: "status"})
  status?: "pending" | "canceled" | "success";

  @Column({type: DataType.DATE, field: "createdAt"})
  createdAt?: Date;

  
  @BelongsTo(() => Company, {as: 'company', foreignKey: 'companyId'})
  company?: Company;

  @BelongsTo(() => BankAccount, {as: 'bankAccount', foreignKey: 'bankAccountId'})
  bankAccount?: BankAccount;

  @HasMany(() => BankAccountShippingPayment, {as: 'bankAccountShippingPayments', foreignKey: 'bankAccountShippingId'})
  bankAccountShippingPayments?: BankAccountShippingPayment[];

}