import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ProductCombination } from "./productCombination.model";
import { ProductCategory } from "./productCategory.model";
import { ProductSupplier } from "./productSupplier.model";

@Table({tableName: "product"})
export class Product extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

  @Column({type: DataType.UUID, field: "categoryId"})
  categoryId?: string;

  @Column({type: DataType.BOOLEAN, field: "isCombination"})
  isCombination?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: "cost"})
  cost?: number;

  @Column({type: DataType.DECIMAL(18, 2), field: "markup"})
  markup?: number;

  @Column({type: DataType.DECIMAL(18, 2), field: "value"})
  value?: number;

  @Column({type: DataType.STRING(20), field: "stockType"})
  stockType?: 'day' | 'balance';

  @Column({type: DataType.DECIMAL(18, 3), field: "stockBalance"})
  stockBalance?: number;

  @Column({type: DataType.INTEGER, field: "stockMin"})
  stockMin?: number;

  @Column({type: DataType.INTEGER, field: "stockMax"})
  stockMax?: number;

  @BelongsTo(() => ProductCategory, {as: 'category', foreignKey: 'categoryId'})
  category?: ProductCategory;

  @HasMany(() => ProductCombination, {as: 'combinations', foreignKey: 'productId'})
  combinations?: ProductCombination[];

  @HasMany(() => ProductSupplier, {as: 'suppliers', foreignKey: 'productId'})
  suppliers?: ProductSupplier[];

}