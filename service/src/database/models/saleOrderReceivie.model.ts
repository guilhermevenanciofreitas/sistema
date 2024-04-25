import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ReceivieForm } from "./ReceivieForm.model";

@Table({tableName: 'saleOrderReceivie'})
export class SaleOrderReceivie extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.UUID, field: 'saleOrderId'})
  saleOrderId?: string;

  @Column({type: DataType.UUID, field: 'receivieFormId'})
  receivieFormId?: string;
  
  @Column({type: DataType.DATE, field: 'dueDate'})
  dueDate?: Date;

  @Column({type: DataType.DECIMAL(18, 2), field: 'value'})
  value?: number;

  @BelongsTo(() => ReceivieForm, {as: 'receivieForm', foreignKey: 'receivieFormId'})
  receivieForm?: ReceivieForm;

}