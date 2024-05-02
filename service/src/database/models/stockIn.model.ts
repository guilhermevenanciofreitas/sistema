import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { StockInProduct } from "./stockInProduct.model";
import { Nfe } from "./nfe.model";
import { StockLocation } from "./stockLocation.model";

@Table({tableName: "stockIn"})
export class StockIn extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "nfeId"})
  nfeId?: string;

  @Column({type: DataType.UUID, field: "stockLocationId"})
  stockLocationId?: string;

  @Column({type: DataType.STRING(20), field: "status"})
  status?: 'pending' | 'checkIn';


  @HasMany(() => Nfe, {as: 'nfe', foreignKey: 'nfeId'})
  nfe?: Nfe;

  @HasMany(() => StockLocation, {as: 'stockLocation', foreignKey: 'stockLocationId'})
  stockLocation?: StockLocation;

  @HasMany(() => StockInProduct, {as: 'products', foreignKey: 'stockInId'})
  products?: StockInProduct[];

}