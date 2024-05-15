import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { Product } from "./product.model";
import { Partner } from "./partner.model";
import { MeasurementUnit } from "./measurementUnit.model";

@Table({tableName: "productSupplier"})
export class ProductSupplier extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(20), field: "code"})
  code?: string;

  @Column({type: DataType.UUID, field: "productId"})
  productId?: string;

  @Column({type: DataType.UUID, field: "supplierId"})
  supplierId?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: "value"})
  value?: string;

  @Column({type: DataType.UUID, field: "measurementUnitId"})
  measurementUnitId?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "contain"})
  contain?: string;

  @BelongsTo(() => Product, {as: 'product', foreignKey: 'productId'})
  product?: Product;

  @BelongsTo(() => Partner, {as: 'supplier', foreignKey: 'supplierId'})
  supplier?: Partner;

  @BelongsTo(() => MeasurementUnit, {as: 'measurementUnit', foreignKey: 'measurementUnitId'})
  measurementUnit?: MeasurementUnit;

}