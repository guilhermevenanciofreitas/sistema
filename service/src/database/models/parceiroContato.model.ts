import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "parceirosContato"})
export class ParceiroContato extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "parceiroId"})
  parceiroId?: string;

  @Column({type: DataType.STRING(100), field: "nome"})
  nome?: string;

  @Column({type: DataType.STRING(30), field: "telefone"})
  telefone?: string;

  @Column({type: DataType.STRING(30), field: "email"})
  email?: string;

}