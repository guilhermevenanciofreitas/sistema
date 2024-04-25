import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { Company } from "./company.model";
import { Partner } from "./partner.model";
import { CalledOccurrence } from "./calledOccurrence.model";

@Table({tableName: "called"})
export class Called extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(15), field: "number"})
  number?: string;

  @Column({type: DataType.UUID, field: "companyId"})
  companyId?: string;

  @Column({type: DataType.UUID, field: "partnerId"})
  partnerId?: string;

  @Column({type: DataType.UUID, field: "responsibleId"})
  responsibleId?: string;

  @Column({type: DataType.UUID, field: "occurrenceId"})
  occurrenceId?: string;

  @Column({type: DataType.DATE, field: "forecast"})
  forecast?: Date;

  @Column({type: DataType.INTEGER, field: "priority"})
  priority?: number

  @Column({type: DataType.STRING(200), field: "subject"})
  subject?: string;

  @Column({type: DataType.STRING(15), field: "status"})
  status?: 'open' | 'late' | 'closed';


  @BelongsTo(() => Company, {as: 'company', foreignKey: 'companyId'})
  company?: Company;

  @BelongsTo(() => Partner, {as: 'partner', foreignKey: 'partnerId'})
  partner?: Partner;

  @BelongsTo(() => Partner, {as: 'responsible', foreignKey: 'responsibleId'})
  responsible?: Partner;

  @BelongsTo(() => CalledOccurrence, {as: 'occurrence', foreignKey: 'occurrenceId'})
  occurrence?: Partner;

}