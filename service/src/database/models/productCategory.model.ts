import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({tableName: "productCategory"})
export class ProductCategory extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

  @Column({type: DataType.BLOB, field: "image"})
  image?: string;

  @Column({type: DataType.INTEGER, field: "ordem"})
  ordem?: number;

  @HasMany(() => Product, 'categoryId')
  products?: Product[];

}