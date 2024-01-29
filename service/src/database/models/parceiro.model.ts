import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { TabelaPreco } from "./tabelaPreco.model";
import { ParceiroContato } from "./parceiroContato.model";
import { ParceiroEndereco } from "./parceiroEndereco.model";

@Table({tableName: "parceiros"})
export class Parceiro extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.BOOLEAN, field: "isCliente"})
  isCliente?: boolean;

  @Column({type: DataType.BOOLEAN, field: "isFornecedor"})
  isFornecedor?: boolean;

  @Column({type: DataType.BOOLEAN, field: "isTransportadora"})
  isTransportadora?: boolean;

  @Column({type: DataType.BOOLEAN, field: "isFuncionario"})
  isFuncionario?: boolean;

  @Column({type: DataType.STRING(100), field: "cpfCnpj"})
  cpfCnpj?: string;

  @Column({type: DataType.STRING(100), field: "nome"})
  nome?: string;

  @Column({type: DataType.STRING(100), field: "apelido"})
  apelido?: string;

  @Column({type: DataType.DATE, field: "nascimento"})
  nascimento?: Date;

  @Column({type: DataType.SMALLINT, field: "sexo"})
  sexo?: number;

  @Column({type: DataType.SMALLINT, field: "estadoCivil"})
  estadoCivil?: number;

  @Column({type: DataType.STRING(20), field: "rg"})
  rg?: string;

  @Column({type: DataType.STRING(30), field: "ie"})
  ie?: string;

  @Column({type: DataType.STRING(30), field: "im"})
  im?: string;

  @Column({type: DataType.STRING(80), field: "profissao"})
  profissao?: string;

  @Column({type: DataType.INTEGER, field: "tabelaPrecoId"})
  tabelaPrecoId?: number;

  @Column({type: DataType.SMALLINT, field: "escolaridade"})
  escolaridade?: number;

  @Column({type: DataType.BOOLEAN, field: "isAtivo"})
  isAtivo?: boolean;

  @Column({type: DataType.BOOLEAN, field: "isBloquearVenda"})
  isBloquearVenda?: boolean;

  @Column({type: DataType.BOOLEAN, field: "isBloquearCompra"})
  isBloquearCompra?: boolean;
  
  @BelongsTo(() => TabelaPreco, 'tabelaPrecoId')
  tabelaPreco?: TabelaPreco;

  @HasMany(() => ParceiroContato, 'parceiroId')
  contatos?: ParceiroContato[];

  @HasMany(() => ParceiroEndereco, 'parceiroId')
  enderecos?: ParceiroEndereco[];

}