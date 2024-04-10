import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";

@Table({tableName: "freightCalculationWeight"})
export class FreightCalculationWeight extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "freightCalculationId"})
  freightCalculationId?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "startWeight"})
  startWeight?: string;

  @Column({type: DataType.DECIMAL(18, 3), field: "endWeight"})
  endWeight?: string;

  @Column({type: DataType.STRING, field: "calculationType"})
  calculationType?: 'fix' | 'multiplied';

  @Column({type: DataType.DECIMAL(18, 2), field: "value"})
  value?: string;

}