import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "freightCalculationType"})
export class FreightCalculationType extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

}