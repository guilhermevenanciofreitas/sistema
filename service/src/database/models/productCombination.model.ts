import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Combination } from "./combination.model";
import { ProductCombinationItem } from "./productCombinationItem.model";

@Table({tableName: "productCombination"})
export class ProductCombination extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "productId"})
  productId?: string;

  @Column({type: DataType.UUID, field: "combinationId"})
  combinationId?: string;

  @Column({type: DataType.BOOLEAN, field: "isRequired"})
  isRequired?: boolean;

  @Column({type: DataType.INTEGER, field: "min"})
  min?: number;

  @Column({type: DataType.INTEGER, field: "max"})
  max?: number;

  @Column({type: DataType.INTEGER, field: "order"})
  order?: number;

  @BelongsTo(() => Combination, {as: 'combination', foreignKey: 'combinationId'})
  combination?: Combination;

  @HasMany(() => ProductCombinationItem, {as: 'combinationItems', foreignKey: 'productCombinationId'})
  combinationItems?: ProductCombinationItem[];

}