import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "partnerContact"})
export class PartnerContact extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "partnerId"})
  partnerId?: string;

  @Column({type: DataType.STRING(100), field: "name"})
  name?: string;

  @Column({type: DataType.STRING(30), field: "phone"})
  phone?: string;

  @Column({type: DataType.STRING(30), field: "email"})
  email?: string;

}