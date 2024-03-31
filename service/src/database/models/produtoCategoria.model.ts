import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Produto } from "./produto.model";

@Table({tableName: "produtoCategoria"})
export class ProdutoCategoria extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.STRING(100), field: "descricao"})
  descricao?: string;

  @Column({type: DataType.BLOB, field: "imagem"})
  imagem?: string;

  @HasMany(() => Produto, 'categoriaId')
  produtos?: Produto[];

}