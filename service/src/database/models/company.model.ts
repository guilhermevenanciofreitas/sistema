import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "company"})
export class Company extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string | null;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @Column({type: DataType.STRING(100), field: "surname"})
  surname?: string;

  @Column({type: DataType.STRING(14), field: "cpfCnpj"})
  cpfCnpj?: string;

  @Column({type: DataType.JSONB, field: "address"})
  address?: any;
  
  @Column({type: DataType.JSONB, field: "pedidoDigital"})
  pedidoDigital?: any;

}