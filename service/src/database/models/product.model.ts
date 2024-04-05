import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { ProdutoCombinacao } from "./produtoCombinacao.model";
import { ProductCategory } from "./productCategory.model";

@Table({tableName: "product"})
export class Product extends Model {
  
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

  @Column({type: DataType.DECIMAL(10, 2), field: "valor"})
  valor?: number;

  @BelongsTo(() => ProductCategory, 'categoriaId')
  categoria?: ProductCategory;

  @HasMany(() => ProdutoCombinacao, 'produtoId')
  combinacoes?: ProdutoCombinacao[];

}