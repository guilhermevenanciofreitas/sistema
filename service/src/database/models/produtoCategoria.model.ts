import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({tableName: "produtoCategoria"})
export class ProdutoCategoria extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

  @Column({type: DataType.BLOB, field: "imagem"})
  imagem?: string;

  @Column({type: DataType.INTEGER, field: "ordem"})
  ordem?: number;

  @HasMany(() => Product, 'categoriaId')
  produtos?: Product[];

}