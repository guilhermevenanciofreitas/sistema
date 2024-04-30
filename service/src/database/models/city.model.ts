import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { State } from "./state.model";

@Table({tableName: "city"})
export class City extends Model {
  
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id"})
  id?: number;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @Column({type: DataType.UUID, field: "stateId"})
  stateId?: string;

  @BelongsTo(() => State, {as: 'state', foreignKey: 'stateId'})
  state?: State;

}