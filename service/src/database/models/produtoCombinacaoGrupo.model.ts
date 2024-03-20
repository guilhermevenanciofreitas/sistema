import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ProdutoCombinacaoItem } from "./produtoCombinacaoItem.model";

@Table({tableName: "produtoCombinacaoGrupo"})
export class ProdutoCombinacaoGrupo extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

  @Column({type: DataType.BOOLEAN, field: "isObrigatorio"})
  isObrigatorio?: string;

  @Column({type: DataType.INTEGER, field: "minimo"})
  minimo?: number;

  @Column({type: DataType.INTEGER, field: "maximo"})
  maximo?: number;

  @HasMany(() => ProdutoCombinacaoItem, 'combinacaoId')
  combinacaoItems?: ProdutoCombinacaoItem[];

}