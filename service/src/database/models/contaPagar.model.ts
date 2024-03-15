import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Parceiro } from "./parceiro.model";

@Table({tableName: "contasPagar"})
export class ContaPagar extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING, field: "numeroDocumento"})
  numeroDocumento?: string;

  @Column({type: DataType.UUID, field: "recebedorId"})
  recebedorId?: string;

  @Column({type: DataType.DATE, field: "emissao"})
  emissao?: Date;

  @Column({type: DataType.DATE, field: "vencimento"})
  vencimento?: Date;

  @Column({type: DataType.DECIMAL, field: "valor"})
  valor?: number;

  @Column({type: DataType.DECIMAL, field: "pagamentoId"})
  pagamentoId?: string;


  @BelongsTo(() => Parceiro, 'recebedorId')
  recebedor?: Parceiro;

}