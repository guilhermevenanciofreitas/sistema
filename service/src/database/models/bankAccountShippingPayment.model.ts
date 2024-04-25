import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Payment } from "./payment.model";

@Table({tableName: "bankAccountShippingPayment"})
export class BankAccountShippingPayment extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "bankAccountShippingId"})
  bankAccountShippingId?: string;

  @Column({type: DataType.UUID, field: "paymentId"})
  paymentId?: string;

  @BelongsTo(() => Payment, {as: 'payment', foreignKey: 'paymentId'})
  payment?: Payment;

}