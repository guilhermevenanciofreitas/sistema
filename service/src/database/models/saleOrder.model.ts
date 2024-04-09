import { Model, Table, Column, DataType, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { Partner } from "./partner.model";
import { SaleOrderItem } from "./saleOrderItem.model";
import { SaleOrderRecieve } from "./saleOrderRecieve.model";
import { SaleOrderStatus } from "./saleOrderStatus.model";
import { PedidoVendaTipoEntrega } from "./pedidoVendaTipoEntrega.model";
import { PedidoVendaDeliveryRoute } from "./pedidoVendaDeliveryRoute.model";
import { Company } from "./company.model";

@Table({tableName: "saleOrder"})
export class SaleOrder extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(30), field: "number"})
  number?: string;

  @Column({type: DataType.UUID, field: "costumerId"})
  costumerId?: string;

  @Column({type: DataType.UUID, field: "companyId"})
  companyId?: string;

  @Column({type: DataType.UUID, field: "sellerId"})
  sellerId?: string;

  @Column({type: DataType.UUID, field: "statusId"})
  statusId?: string;

  @Column({type: DataType.UUID, field: "tipoEntregaId"})
  tipoEntregaId?: string;

  @Column({type: DataType.JSONB, field: "entrega"})
  entrega?: any;

  @Column({type: DataType.UUID, field: "entregadorId"})
  entregadorId?: string;

  @Column({type: DataType.DECIMAL(18, 2), field: "valor"})
  valor?: number;

  @Column({type: DataType.DATE, field: "createdAt"})
  createdAt?: Date;


  
  @BelongsTo(() => Partner, {as: 'costumer', foreignKey: 'costumerId'})
  costumer?: Partner;

  @BelongsTo(() => Company, {as: 'company', foreignKey: 'companyId'})
  company?: Company;

  @BelongsTo(() => Partner, {as: 'seller', foreignKey: 'sellerId'})
  seller?: Partner;

  @BelongsTo(() => PedidoVendaTipoEntrega, 'tipoEntregaId')
  tipoEntrega?: PedidoVendaTipoEntrega;

  @BelongsTo(() => SaleOrderStatus, 'statusId')
  status?: SaleOrderStatus;

  @HasMany(() => SaleOrderItem, 'saleOrderId')
  itens?: SaleOrderItem[];

  @HasMany(() => SaleOrderRecieve, 'pedidoVendaId')
  pagamentos?: SaleOrderRecieve[];

  @BelongsTo(() => Partner, 'entregadorId')
  entregador?: Partner;

  @HasMany(() => PedidoVendaDeliveryRoute, 'pedidoVendaId')
  deliveryRoutes?: PedidoVendaDeliveryRoute[];

}