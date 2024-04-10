import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "calledTask"})
export class CalledTask extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "calledId"})
  calledId?: string;

  @Column({type: DataType.UUID, field: "taskId"})
  taskId?: string;

  @Column({type: DataType.UUID, field: "responsibleId"})
  responsibleId?: string;

  @Column({type: DataType.BOOLEAN, field: "checked"})
  checked?: boolean;

}