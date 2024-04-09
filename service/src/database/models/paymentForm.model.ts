import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "paymentForm"})
export class PaymentForm extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "description"})
  description?: string;

  @Column({type: DataType.STRING, field: "type"})
  type?: "pix" | "transferencia" | "boleto";

}