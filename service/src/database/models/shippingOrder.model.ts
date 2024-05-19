import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Partner } from "./partner.model";
import { Company } from "./company.model";
import { ShippingOrderStatus } from "./shippingOrderStatus.model";
import { ShippingOrderNfe } from "./shippingOrderNfe.model";

@Table({tableName: 'shippingOrder'})
export class ShippingOrder extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.STRING(30), field: 'number'})
  number?: string;

  @Column({type: DataType.UUID, field: 'companyId'})
  companyId?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: 'value'})
  value?: number;

  @Column({type: DataType.UUID, field: 'senderId'})
  senderId?: string;

  @Column({type: DataType.UUID, field: 'recipientId'})
  recipientId?: string;

  @Column({type: DataType.UUID, field: 'statusId'})
  statusId?: string;

  @Column({type: DataType.STRING(50), field: 'predominantProduct'})
  predominantProduct?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: 'weight'})
  weight?: number;


  @BelongsTo(() => Company, {as: 'company', foreignKey: 'companyId'})
  company?: Company;

  @BelongsTo(() => Partner, {as: 'sender', foreignKey: 'senderId'})
  sender?: Partner;

  @BelongsTo(() => Partner, {as: 'recipient', foreignKey: 'recipientId'})
  recipient?: Partner;

  @BelongsTo(() => ShippingOrderStatus, {as: 'status', foreignKey: 'statusId'})
  status?: ShippingOrderStatus;

  @HasMany(() => ShippingOrderNfe, {as: 'nfes', foreignKey: 'shippingOrderId'})
  nfes?: ShippingOrderNfe[];

}