import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "saleOrderProgress"})
export class SaleOrderProgress extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "pedidoVendaId"})
  pedidoVendaId?: string;

  @Column({type: DataType.DATE, field: "data"})
  data?: Date;

  @Column({type: DataType.UUID, field: "statusId"})
  statusId?: string;

}