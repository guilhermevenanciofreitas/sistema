import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Cte } from "./cte.model";
import { Trip } from "./trip.model";

@Table({tableName: 'tripCte'})
export class TripCte extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.UUID, field: 'tripId'})
  tripId?: string;

  @Column({type: DataType.UUID, field: 'cteId'})
  cteId?: string;

  @BelongsTo(() => Trip, {as: 'trip', foreignKey: 'tripId'})
  trip?: Trip;

  @BelongsTo(() => Cte, {as: 'cte', foreignKey: 'cteId'})
  cte?: Cte;

}