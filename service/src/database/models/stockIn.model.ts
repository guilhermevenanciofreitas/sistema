import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { StockInProduct } from "./stockInProduct.model";
import { Nfe } from "./nfe.model";
import { Stock } from "./stock.model";

@Table({tableName: "stockIn"})
export class StockIn extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "nfeId"})
  nfeId?: string;

  @Column({type: DataType.UUID, field: "stockId"})
  stockId?: string;


  @HasMany(() => Nfe, {as: 'nfe', foreignKey: 'nfeId'})
  nfe?: Nfe;

  @HasMany(() => Stock, {as: 'stock', foreignKey: 'stockId'})
  stock?: Stock;

  @HasMany(() => StockInProduct, {as: 'products', foreignKey: 'stockInId'})
  products?: StockInProduct[];

}