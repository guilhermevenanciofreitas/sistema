import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "freightQuote"})
export class FreightQuote extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

}