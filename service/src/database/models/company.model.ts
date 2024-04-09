import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "company"})
export class Company extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string | null;

  @Column({type: DataType.STRING(100), field: "razaoSocial"})
  razaoSocial?: string;

  @Column({type: DataType.STRING(100), field: "nomeFantasia"})
  nomeFantasia?: string;

  @Column({type: DataType.STRING(14), field: "cpfCnpj"})
  cpfCnpj?: string;

  @Column({type: DataType.JSONB, field: "endereco"})
  endereco?: any;
  
  @Column({type: DataType.JSONB, field: "pedidoDigital"})
  pedidoDigital?: any;

}