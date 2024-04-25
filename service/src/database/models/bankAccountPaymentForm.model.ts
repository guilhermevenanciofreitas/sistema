import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { PaymentForm } from "./paymentForm.model";
import { BankAccount } from "./bankAccount.model";

@Table({tableName: "bankAccountPaymentForm"})
export class BankAccountPaymentForm extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "bankAccountId"})
  bankAccountId?: string;

  @Column({type: DataType.UUID, field: "paymentFormId"})
  paymentFormId?: string;

  @BelongsTo(() => BankAccount, {as: 'bankAccount', foreignKey: 'bankAccountId'})
  bankAccount?: BankAccount;

  @BelongsTo(() => PaymentForm, {as: 'paymentForm', foreignKey: 'paymentFormId'})
  paymentForm?: PaymentForm;

}