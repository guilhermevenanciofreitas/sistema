import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "receivieForm"})
export class ReceivieForm extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "description"})
  description?: string;

  @Column({type: DataType.STRING, field: "type"})
  type?: "pix" | "transferencia" | "boleto";

}