import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { Product } from "./product.model";
import { Partner } from "./partner.model";

@Table({tableName: "productSupplier"})
export class ProductSupplier extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "productId"})
  productId?: string;

  @Column({type: DataType.UUID, field: "supplierId"})
  supplierId?: string;

  @BelongsTo(() => Product, {as: 'product', foreignKey: 'productId'})
  product?: Product;

  @BelongsTo(() => Partner, {as: 'supplier', foreignKey: 'supplierId'})
  supplier?: Partner;

}