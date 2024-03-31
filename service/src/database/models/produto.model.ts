import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { ProdutoCombinacao } from "./produtoCombinacao.model";
import { ProdutoCategoria } from "./produtoCategoria.model";

@Table({tableName: "produtos"})
export class Produto extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "nome"})
  nome?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

  @Column({type: DataType.UUID, field: "categoriaId"})
  categoriaId?: string;

  @Column({type: DataType.BOOLEAN, field: "isCombinacao"})
  isCombinacao?: string;

  @BelongsTo(() => ProdutoCategoria, 'categoriaId')
  categoria?: ProdutoCategoria;

  @HasMany(() => ProdutoCombinacao, 'produtoId')
  combinacoes?: ProdutoCombinacao[];

}