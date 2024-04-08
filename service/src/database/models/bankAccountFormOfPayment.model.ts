import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";

@Table({tableName: "bankAccountFormOfPayment"})
export class BankAccountFormOfPayment extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "bankAccountId"})
  bankAccountId?: string;

  @Column({type: DataType.UUID, field: "formOfPaymentId"})
  formOfPaymentId?: string;

}