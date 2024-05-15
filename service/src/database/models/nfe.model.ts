import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { StockIn } from "./stockIn.model";

@Table({tableName: "nfe"})
export class Nfe extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.JSONB, field: "NFe"})
  NFe?: any;

  @Column({type: DataType.JSONB, field: "protNFe"})
  protNFe?: any;

  @HasMany(() => StockIn, {as: 'stockIns', foreignKey: 'nfeId'})
  stockIns?: StockIn[];

}