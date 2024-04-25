import { Model, Table, Column, DataType, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { Partner } from "./partner.model";
import { SaleOrderItem } from "./saleOrderItem.model";
import { SaleOrderRecieve } from "./saleOrderRecieve.model";
import { SaleOrderStatus } from "./saleOrderStatus.model";
import { SaleOrderShippingType } from "./saleOrderShippingType.model";
import { Company } from "./company.model";
import { SaleOrderNfe } from "./saleOrderNfe.model";

@Table({tableName: "saleOrder"})
export class SaleOrder extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "companyId"})
  companyId?: string;

  @Column({type: DataType.STRING(30), field: "number"})
  number?: string;

  @Column({type: DataType.UUID, field: "costumerId"})
  costumerId?: string;

  @Column({type: DataType.UUID, field: "sellerId"})
  sellerId?: string;

  @Column({type: DataType.UUID, field: "statusId"})
  statusId?: string;

  @Column({type: DataType.UUID, field: "shippingTypeId"})
  shippingTypeId?: string;

  @Column({type: DataType.UUID, field: "shippingCompanyId"})
  shippingCompanyId?: string;

  @Column({type: DataType.JSONB, field: "shippingAddress"})
  shippingAddress?: any;

  @Column({type: DataType.DECIMAL(18, 2), field: "value"})
  value?: number;

  @Column({type: DataType.DATE, field: "createdAt"})
  createdAt?: Date;


  @BelongsTo(() => Company, {as: 'company', foreignKey: 'companyId'})
  company?: Company;
  
  @BelongsTo(() => Partner, {as: 'costumer', foreignKey: 'costumerId'})
  costumer?: Partner;

  @BelongsTo(() => Partner, {as: 'seller', foreignKey: 'sellerId'})
  seller?: Partner;

  @BelongsTo(() => SaleOrderStatus, {as: 'status', foreignKey: 'statusId'})
  status?: SaleOrderStatus;

  @BelongsTo(() => SaleOrderShippingType, {as: 'shippingType', foreignKey: 'shippingTypeId'})
  shippingType?: SaleOrderShippingType;

  @BelongsTo(() => Partner, {as: 'shippingCompany', foreignKey: 'shippingCompanyId'})
  shippingCompany?: Partner;

  @HasMany(() => SaleOrderItem, {as: 'items', foreignKey: 'saleOrderId'})
  items?: SaleOrderItem[];

  @HasMany(() => SaleOrderRecieve, {as: 'recievies', foreignKey: 'saleOrderId'})
  recievies?: SaleOrderRecieve[];

  @HasMany(() => SaleOrderNfe, {as: 'nfes', foreignKey: 'saleOrderId'})
  nfes?: SaleOrderNfe[];

}