import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "usuarios"})
export class Usuario extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "email"})
  email?: string;

  @Column({type: DataType.STRING(80), field: "nome"})
  nome?: string;

}