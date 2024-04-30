import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";

@Table({tableName: "cte"})
export class Cte extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.JSONB, field: "ide"})
  ide?: any;

  @Column({type: DataType.JSONB, field: "emit"})
  emit?: any;

  @Column({type: DataType.JSONB, field: "rem"})
  rem?: any;

  @Column({type: DataType.JSONB, field: "dest"})
  dest?: any;

  @Column({type: DataType.JSONB, field: "vPrest"})
  vPrest?: any;

  @Column({type: DataType.JSONB, field: "imp"})
  imp?: any;

  @Column({type: DataType.JSONB, field: "infCTeNorm"})
  infCTeNorm?: any;

  @Column({type: DataType.JSONB, field: "infCTeSupl"})
  infCTeSupl?: any;


  @Column({type: DataType.JSONB, field: "signature"})
  signature?: any;

  @Column({type: DataType.JSONB, field: "protCTe"})
  protCTe?: any;
  
}