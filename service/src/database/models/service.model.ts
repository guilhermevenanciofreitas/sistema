import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "service"})
export class Service extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

}