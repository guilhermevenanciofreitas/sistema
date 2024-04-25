import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { ProductCombinationItem } from "./productCombinationItem.model";

@Table({tableName: 'productCombinationGroup'})
export class ProductCombinationGroup extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.STRING(100), field: 'description'})
  description?: string;

  @Column({type: DataType.BOOLEAN, field: 'isObrigatorio'})
  isObrigatorio?: string;

  @Column({type: DataType.INTEGER, field: 'minimo'})
  minimo?: number;

  @Column({type: DataType.INTEGER, field: 'maximo'})
  maximo?: number;

  @Column({type: DataType.INTEGER, field: 'ordem'})
  ordem?: number;

  @HasMany(() => ProductCombinationItem, {as: 'combinationItems', foreignKey: 'combinationId'})
  combinationItems?: ProductCombinationItem[];

}