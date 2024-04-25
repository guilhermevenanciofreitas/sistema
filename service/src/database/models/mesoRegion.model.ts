import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { State } from "./state.model";

@Table({tableName: "mesoRegion"})
export class MesoRegion extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "stateId"})
  stateId?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

  @BelongsTo(() => State, {as: 'state', foreignKey: 'stateId'})
  state?: State;

}