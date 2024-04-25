import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Company } from "./company.model";
import { FreightCalculationType } from "./freightCalculationType.model";
import { Partner } from "./partner.model";
import { MesoRegion } from "./mesoRegion.model";

@Table({tableName: "freightQuote"})
export class FreightQuote extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "companyId"})
  companyId?: string;

  @Column({type: DataType.UUID, field: "typeId"})
  typeId?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "weight"})
  weight?: number;

  @Column({type: DataType.UUID, field: "senderId"})
  senderId?: string;

  @Column({type: DataType.UUID, field: "senderMesoRegionId"})
  senderMesoRegionId?: string;

  @Column({type: DataType.UUID, field: "recipientId"})
  recipientId?: string;

  @Column({type: DataType.UUID, field: "recipientMesoRegionId"})
  recipientMesoRegionId?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: "value"})
  value?: number;

  @Column({type: DataType.DECIMAL(18, 2), field: "aliquotICMS"})
  aliquotICMS?: number;

  @Column({type: DataType.DECIMAL(18, 2), field: "valueICMS"})
  valueICMS?: number;



  @BelongsTo(() => Company, {as: 'company', foreignKey: 'companyId'})
  company?: Company;

  @BelongsTo(() => FreightCalculationType, {as: 'type', foreignKey: 'typeId'})
  type?: FreightCalculationType;

  @BelongsTo(() => Partner, {as: 'sender', foreignKey: 'senderId'})
  sender?: Partner;

  @BelongsTo(() => MesoRegion, {as: 'senderMesoRegion', foreignKey: 'senderMesoRegionId'})
  senderMesoRegion?: MesoRegion;

  @BelongsTo(() => Partner, {as: 'recipient', foreignKey: 'recipientId'})
  recipient?: Partner;

  @BelongsTo(() => MesoRegion, {as: 'recipientMesoRegion', foreignKey: 'recipientMesoRegionId'})
  recipientMesoRegion?: MesoRegion;

}