import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Trip } from "./trip.model";
import { Vehicle } from "./vehicle.model";

@Table({tableName: 'tripVehicle'})
export class TripVehicle extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.UUID, field: 'tripId'})
  tripId?: string;

  @Column({type: DataType.UUID, field: 'vehicleId'})
  vehicleId?: string;

  @BelongsTo(() => Trip, {as: 'trip', foreignKey: 'tripId'})
  trip?: Trip;

  @BelongsTo(() => Vehicle, {as: 'vehicle', foreignKey: 'vehicleId'})
  vehicle?: Vehicle;

}