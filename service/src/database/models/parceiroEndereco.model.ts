import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Parceiro } from "./parceiro.model";

@Table({tableName: "parceirosEndereco"})
export class ParceiroEndereco extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "parceiroId"})
  parceiroId?: string;

  @Column({type: DataType.STRING(8), field: "cep"})
  cep?: string;

  @Column({type: DataType.STRING(100), field: "logradouro"})
  logradouro?: string;

  @Column({type: DataType.STRING(20), field: "numero"})
  numero?: string;

  @Column({type: DataType.STRING(50), field: "complemento"})
  complemento?: string;

  @Column({type: DataType.STRING(50), field: "bairro"})
  bairro?: string;

  @Column({type: DataType.UUID, field: "estadoId"})
  estadoId?: string;

  @BelongsTo(() => Parceiro, 'parceiroId')
  parceiro?: Parceiro;

}