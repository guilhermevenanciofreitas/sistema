import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";

@Table({tableName: "bankAccountPaymentForm"})
export class BankAccountPaymentForm extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "bankAccountId"})
  bankAccountId?: string;

  @Column({type: DataType.UUID, field: "paymentFormId"})
  paymentFormId?: string;

}