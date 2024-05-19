import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { Product } from "./product.model";
import { ProductCategory } from "./productCategory.model";

@Table({tableName: "productSubCategory"})
export class ProductSubCategory extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "categoryId"})
  categoryId?: string;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @BelongsTo(() => ProductCategory, {as: 'category', foreignKey: 'categoryId'})
  category?: ProductCategory;

  @HasMany(() => Product, 'subCategoryId')
  products?: Product[];

}