import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";

@Table({tableName: "cte"})
export class Cte extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.JSONB, field: "CTe"})
  CTe?: any;

  @Column({type: DataType.JSONB, field: "protCTe"})
  protCTe?: any;
  
}