import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Partner } from "./partner.model";

@Table({tableName: "contract"})
export class Contract extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "clienteId"})
  clienteId?: string;

  @Column({type: DataType.DATE, field: "inicio"})
  inicio?: Date;

  @Column({type: DataType.DATE, field: "termino"})
  termino?: Date;

  @Column({type: DataType.BOOLEAN, field: "isCancelado"})
  isCancelado?: boolean;

  @BelongsTo(() => Partner, 'clienteId')
  cliente?: Partner;

}