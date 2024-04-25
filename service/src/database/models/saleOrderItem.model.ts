import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Product } from "./product.model";
import { SaleOrderItemCombination } from "./saleOrderItemCombination.model";

@Table({tableName: "saleOrderItem"})
export class SaleOrderItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "saleOrderId"})
  saleOrderId?: string;

  @Column({type: DataType.UUID, field: "produtoId"})
  produtoId?: string;

  @Column({type: DataType.DECIMAL(10, 3), field: "quantidade"})
  quantidade?: number;

  @Column({type: DataType.DECIMAL(10, 2), field: "valor"})
  value?: number;

  @BelongsTo(() => Product, 'produtoId')
  product?: Product;

  @HasMany(() => SaleOrderItemCombination, 'saleOrderItemId')
  itemCombinations?: SaleOrderItemCombination[];

}