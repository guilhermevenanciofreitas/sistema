import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";

@Table({tableName: 'combination'})
export class Combination extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.STRING(100), field: 'name'})
  name?: string;

}