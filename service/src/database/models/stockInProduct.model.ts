import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";

@Table({tableName: "stockInProduct"})
export class StockInProduct extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "stockInId"})
  stockInId?: string;

  @Column({type: DataType.UUID, field: "productId"})
  productId?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "quantity"})
  quantity?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "balance"})
  balance?: string;

  @Column({type: DataType.STRING(20), field: "status"})
  status?: 'pending' | 'checkIn';

}