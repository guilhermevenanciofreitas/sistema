import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { SaleOrderItemCombination } from "./saleOrderItemCombination.model";

@Table({tableName: "saleOrderItemCombinationItem"})
export class SaleOrderItemCombinationItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "saleOrderItemCombinationId"})
  saleOrderItemCombinationId?: string;

  @Column({type: DataType.UUID, field: "itemCombinationId"})
  itemCombinationId?: string;

  @Column({type: DataType.UUID, field: "quantity"})
  quantity?: number;

  @BelongsTo(() => SaleOrderItemCombination, 'saleOrderItemId')
  itemCombinations?: SaleOrderItemCombination;

}