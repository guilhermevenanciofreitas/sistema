import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { MesoRegion } from "./mesoRegion.model";

@Table({tableName: "freightCalculationRecipient"})
export class FreightCalculationRecipient extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "freightCalculationId"})
  freightCalculationId?: string;

  @Column({type: DataType.UUID, field: "recipientMesoRegionId"})
  recipientMesoRegionId?: string;

  
  @BelongsTo(() => MesoRegion, {as: 'recipientMesoRegion', foreignKey: 'recipientMesoRegionId'})
  recipientMesoRegion?: MesoRegion;

}