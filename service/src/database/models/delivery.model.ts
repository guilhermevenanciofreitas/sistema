import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { DeliveryRoute } from "./deliveryRoute.model";

@Table({tableName: "delivery"})
export class Delivery extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "entregadorId"})
  entregadorId?: string;

  @Column({type: DataType.DATE, field: "saiuParaEntrega"})
  saiuParaEntrega?: Date;

  @Column({type: DataType.DATE, field: "finalizado"})
  finalizado?: Date;

  @HasMany(() => DeliveryRoute, 'deliveryId')
  deliveryRoutes?: DeliveryRoute[];

}