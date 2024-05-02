import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";

@Table({tableName: "dfeProcNfe"})
export class DfeProcNfe extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "dfeId"})
  dfeId?: string;

  @Column({type: DataType.BLOB, field: "xml"})
  xml?: string;

}