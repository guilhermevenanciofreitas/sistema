import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { SaleOrderStatusByFrom } from "./saleOrderStatusByFrom.model";
import { SaleOrder } from "./saleOrder.model";

@Table({tableName: "saleOrderStatus"})
export class SaleOrderStatus extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

  @Column({type: DataType.STRING(20), field: "color"})
  color?: string;

  @Column({type: DataType.INTEGER, field: "ordem"})
  ordem?: string;
  
  @HasMany(() => SaleOrderStatusByFrom, 'statusById')
  statusBy?: SaleOrderStatusByFrom[];

  @HasMany(() => SaleOrderStatusByFrom, 'statusFromId')
  statusFrom?: SaleOrderStatusByFrom[];

  @HasMany(() => SaleOrder, 'statusId')
  saleOrders?: SaleOrder[];

}