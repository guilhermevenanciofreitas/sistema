import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "municipio"})
export class Municipio extends Model {
  
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id"})
  id?: number;

  @Column({type: DataType.STRING(100), field: "nome"})
  nome?: string;

}