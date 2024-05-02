import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";

@Table({tableName: "stockLocation"})
export class StockLocation extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

}