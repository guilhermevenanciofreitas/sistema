import { Model, Table, Column, DataType, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { Product } from "./product.model";
import { SaleOrderItemCombination } from "./saleOrderItemCombination.model";

@Table({tableName: "saleOrderItem"})
export class SaleOrderItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "saleOrderId"})
  saleOrderId?: string;

  @Column({type: DataType.UUID, field: "productId"})
  productId?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "quantity"})
  quantity?: number;

  @Column({type: DataType.DECIMAL(18, 2), field: "value"})
  value?: number;

  @Column({type: DataType.DECIMAL(18, 2), field: "discount"})
  discount?: number;

  @BelongsTo(() => Product, {as: 'product', foreignKey: 'productId'})
  product?: Product;

  @HasMany(() => SaleOrderItemCombination, {as: 'itemCombinations', foreignKey: 'saleOrderItemId'})
  itemCombinations?: SaleOrderItemCombination[];

}