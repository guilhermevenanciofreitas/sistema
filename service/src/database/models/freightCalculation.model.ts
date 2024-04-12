import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { FreightCalculationType } from "./freightCalculationType.model";
import { MesoRegion } from "./mesoRegion.model";
import { FreightCalculationWeight } from "./freightCalculationWeight.model";
import { FreightCalculationRecipient } from "./freightCalculationRecipient.model";

@Table({tableName: "freightCalculation"})
export class FreightCalculation extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "description"})
  description?: string;

  @Column({type: DataType.UUID, field: "typeId"})
  typeId?: string;

  @Column({type: DataType.UUID, field: "senderMesoRegionId"})
  senderMesoRegionId?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: "aliquotICMS"})
  aliquotICMS?: string;

  @BelongsTo(() => FreightCalculationType, 'typeId')
  type?: FreightCalculationType;

  @BelongsTo(() => MesoRegion, {as: 'senderMesoRegion', foreignKey: 'senderMesoRegionId'})
  senderMesoRegion?: MesoRegion;

  @HasMany(() => FreightCalculationRecipient, 'freightCalculationId')
  recipients?: FreightCalculationRecipient[];

  @HasMany(() => FreightCalculationWeight, 'freightCalculationId')
  weights?: FreightCalculationWeight[];

}