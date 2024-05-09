import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";

@Table({tableName: "nfe"})
export class Nfe extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.JSONB, field: "NFe"})
  NFe?: any;

  @Column({type: DataType.JSONB, field: "protNFe"})
  protNFe?: any;

}