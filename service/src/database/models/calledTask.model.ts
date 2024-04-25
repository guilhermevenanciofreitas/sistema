import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { Called } from "./called.model";
import { Task } from "./task.model";
import { Partner } from "./partner.model";

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

  
  @BelongsTo(() => Called, {as: 'called', foreignKey: 'calledId'})
  called?: Called;

  @BelongsTo(() => Task, {as: 'task', foreignKey: 'taskId'})
  task?: Task;

  @BelongsTo(() => Partner, {as: 'responsible', foreignKey: 'responsibleId'})
  responsible?: Partner;

}