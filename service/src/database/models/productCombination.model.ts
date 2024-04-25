import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { ProductCombinationGroup } from "./productCombinationGroup.model";
import { ProductCombinationItem } from "./productCombinationItem.model";

@Table({tableName: "productCombination"})
export class ProductCombination extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "productId"})
  productId?: string;

  @Column({type: DataType.UUID, field: "combinationGroupId"})
  combinationGroupId?: string;

  @Column({type: DataType.BOOLEAN, field: "isObrigatorio"})
  isObrigatorio?: string;

  @Column({type: DataType.INTEGER, field: "minimo"})
  minimo?: number;

  @Column({type: DataType.INTEGER, field: "maximo"})
  maximo?: number;

  @Column({type: DataType.INTEGER, field: "ordem"})
  ordem?: number;

  @BelongsTo(() => ProductCombinationGroup, {as: 'combinationGroup', foreignKey: 'combinationGroupId'})
  combinationGroup?: ProductCombinationGroup;

  @HasMany(() => ProductCombinationItem, {as: 'combinationItems', foreignKey: 'combinationId', onDelete: 'cascade'})
  combinationItems?: ProductCombinationItem[];

}