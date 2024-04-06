import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "formOfPayment"})
export class FormOfPayment extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "description"})
  description?: string;

}