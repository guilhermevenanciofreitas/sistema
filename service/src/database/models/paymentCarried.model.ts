import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";

@Table({tableName: "paymentCarried"})
export class PaymentCarried extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "paymentId"})
  paymentId?: string;

  @Column({type: DataType.DECIMAL, field: "valor"})
  valor?: number;

}