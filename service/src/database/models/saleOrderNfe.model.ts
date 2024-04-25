import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Nfe } from "./nfe.model";

@Table({tableName: "saleOrderNfe"})
export class SaleOrderNfe extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "saleOrderId"})
  saleOrderId?: string;

  @Column({type: DataType.UUID, field: "nfeId"})
  nfeId?: string;

  @BelongsTo(() => Nfe, 'nfeId')
  nfe?: Nfe;

}