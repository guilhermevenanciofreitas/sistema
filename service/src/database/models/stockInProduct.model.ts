import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { StockLocation } from "./stockLocation.model";
import { StockIn } from "./stockIn.model";
import { Product } from "./product.model";
import { MeasurementUnit } from "./measurementUnit.model";

@Table({tableName: "stockInProduct"})
export class StockInProduct extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "stockInId"})
  stockInId?: string;

  @Column({type: DataType.UUID, field: "stockLocationId"})
  stockLocationId?: string;

  @Column({type: DataType.UUID, field: "productId"})
  productId?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "quantity"})
  quantity?: number;
  
  @Column({type: DataType.DECIMAL(18, 2), field: "value"})
  value?: number;

  @Column({type: DataType.UUID, field: "measurementUnitId"})
  measurementUnitId?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "contain"})
  contain?: number;

  @Column({type: DataType.DECIMAL(18, 3), field: "balance"})
  balance?: number;

  @Column({type: DataType.JSONB, field: "prod"})
  prod?: any;

  
  @BelongsTo(() => StockIn, {as: 'stockIn', foreignKey: 'stockInId'})
  stockIn?: StockIn;
  
  @BelongsTo(() => StockLocation, {as: 'stockLocation', foreignKey: 'stockLocationId'})
  stockLocation?: StockLocation;

  @BelongsTo(() => Product, {as: 'product', foreignKey: 'productId'})
  product?: Product;

  @BelongsTo(() => MeasurementUnit, {as: 'measurementUnit', foreignKey: 'measurementUnitId'})
  measurementUnit?: MeasurementUnit;

}