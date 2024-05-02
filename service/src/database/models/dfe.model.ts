import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { DfeProcNfe, DfeResNfe } from "..";

@Table({tableName: "dfe"})
export class Dfe extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.DATE, field: "dhResp"})
  dhResp?: Date;

  @Column({type: DataType.INTEGER, field: "maxNSU"})
  maxNSU?: number;

  @Column({type: DataType.INTEGER, field: "ultNSU"})
  ultNSU?: number;

  @HasMany(() => DfeProcNfe, {as: 'procNfes', foreignKey: 'dfeId'})
  procNfes?: DfeProcNfe[];

  @HasMany(() => DfeResNfe, {as: 'resNfes', foreignKey: 'dfeId'})
  resNfes?: DfeResNfe[];

}