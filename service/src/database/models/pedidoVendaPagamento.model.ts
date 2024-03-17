import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { FormaPagamento } from "./formaPagamento.model";

@Table({tableName: "pedidoVendaPagamento"})
export class PedidoVendaPagamento extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "pedidoVendaId"})
  pedidoVendaId?: string;

  @Column({type: DataType.UUID, field: "formaPagamentoId"})
  formaPagamentoId?: string;

  @Column({type: DataType.DECIMAL(10, 2), field: "valor"})
  valor?: number;

  @BelongsTo(() => FormaPagamento, 'formaPagamentoId')
  formaPagamento?: FormaPagamento;

}