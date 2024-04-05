import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { ProdutoCombinacaoGrupo } from "./produtoCombinacaoGrupo.model";
import { ProdutoCombinacaoItem } from "./produtoCombinacaoItem.model";

@Table({tableName: "produtoCombinacao"})
export class ProdutoCombinacao extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "produtoId"})
  produtoId?: string;

  @Column({type: DataType.UUID, field: "combinacaoId"})
  combinacaoId?: string;

  @Column({type: DataType.BOOLEAN, field: "isObrigatorio"})
  isObrigatorio?: string;

  @Column({type: DataType.INTEGER, field: "minimo"})
  minimo?: number;

  @Column({type: DataType.INTEGER, field: "maximo"})
  maximo?: number;

  @Column({type: DataType.INTEGER, field: "ordem"})
  ordem?: number;

  @BelongsTo(() => ProdutoCombinacaoGrupo, 'combinacaoId')
  combinacao?: ProdutoCombinacaoGrupo;

  @HasMany(() => ProdutoCombinacaoItem, {onDelete: 'cascade', foreignKey: 'combinacaoId'})
  combinacaoItems?: ProdutoCombinacaoItem[];

}