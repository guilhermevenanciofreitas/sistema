import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { StockInProduct } from "./stockInProduct.model";
import { Nfe } from "./nfe.model";

@Table({tableName: "stockIn"})
export class StockIn extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.DATE, field: "createdAt"})
  createdAt?: Date;

  @Column({type: DataType.UUID, field: "nfeId"})
  nfeId?: string;

  @Column({type: DataType.STRING(20), field: "status"})
  status?: 'pending' | 'checkIn';


  @BelongsTo(() => Nfe, {as: 'nfe', foreignKey: 'nfeId'})
  nfe?: Nfe;

  @HasMany(() => StockInProduct, {as: 'products', foreignKey: 'stockInId'})
  products?: StockInProduct[];

}