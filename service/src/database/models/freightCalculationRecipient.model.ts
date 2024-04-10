import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { Region } from "./region.model";

@Table({tableName: "freightCalculationRecipient"})
export class FreightCalculationRecipient extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "freightCalculationId"})
  freightCalculationId?: string;

  @Column({type: DataType.UUID, field: "recipientRegionId"})
  recipientRegionId?: string;

  @BelongsTo(() => Region, 'recipientRegionId')
  recipientRegion?: Region;

}