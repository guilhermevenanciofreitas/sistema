import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({tableName: "legalNature"})
export class LegalNature extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(10), field: "code"})
  code?: string;

  @Column({type: DataType.STRING(150), field: "name"})
  name?: string;

}