import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { FormOfPayment } from "./formOfPayment.model";

@Table({tableName: "saleOrderRecieve"})
export class SaleOrderRecieve extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "pedidoVendaId"})
  pedidoVendaId?: string;

  @Column({type: DataType.UUID, field: "formaPagamentoId"})
  formaPagamentoId?: string;
  
  @Column({type: DataType.DATE, field: "vencimento"})
  vencimento?: Date;

  @Column({type: DataType.DECIMAL(10, 2), field: "valor"})
  valor?: number;

  @BelongsTo(() => FormOfPayment, 'formaPagamentoId')
  formaPagamento?: FormOfPayment;

}