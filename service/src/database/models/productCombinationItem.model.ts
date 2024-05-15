import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { ProductCombination } from "./productCombination.model";

@Table({tableName: "productCombinationItem"})
export class ProductCombinationItem extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "productCombinationId"})
  productCombinationId?: string;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

  @BelongsTo(() => ProductCombination, {as: 'productCombination', foreignKey: 'productCombinationId'})
  productCombination?: ProductCombination;

}