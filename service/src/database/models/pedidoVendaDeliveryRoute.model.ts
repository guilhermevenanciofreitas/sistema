import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "pedidoVendaDeliveryRoute"})
export class PedidoVendaDeliveryRoute extends Model {
  
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id"})
  id?: number;

  @Column({type: DataType.UUID, field: "pedidoVendaId"})
  pedidoVendaId?: string;

  @Column({type: DataType.UUID, field: "deliveryRouteId"})
  deliveryRouteId?: string;

}