import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "task"})
export class Task extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(10), field: "type"})
  type?: 'called' | 'workshop';

  @Column({type: DataType.STRING(80), field: "description"})
  description?: string;

}