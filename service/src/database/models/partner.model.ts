import { Model, Table, Column, DataType, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { TabelaPreco } from "./tabelaPreco.model";
import { PartnerContact } from "./partnerContact.model";
import { PartnerAddress } from "./partnerAddress.model";

@Table({tableName: "partner"})
export class Partner extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.BOOLEAN, field: 'isCostumer'})
  isCostumer?: boolean;

  @Column({type: DataType.BOOLEAN, field: 'isSupplier'})
  isSupplier?: boolean;

  @Column({type: DataType.BOOLEAN, field: 'isShippingCompany'})
  isShippingCompany?: boolean;

  @Column({type: DataType.BOOLEAN, field: 'isEmployee'})
  isEmployee?: boolean;

  @Column({type: DataType.STRING(100), field: 'cpfCnpj'})
  cpfCnpj?: string;

  @Column({type: DataType.STRING(100), field: 'name'})
  name?: string;

  @Column({type: DataType.STRING(100), field: 'surname'})
  surname?: string;

  @Column({type: DataType.DATE, field: 'birth'})
  birth?: Date;

  @Column({type: DataType.SMALLINT, field: 'sex'})
  sex?: number;

  @Column({type: DataType.SMALLINT, field: 'estadoCivil'})
  estadoCivil?: number;

  @Column({type: DataType.STRING(20), field: 'rg'})
  rg?: string;

  @Column({type: DataType.STRING(30), field: 'ie'})
  ie?: string;

  @Column({type: DataType.STRING(30), field: 'im'})
  im?: string;

  @Column({type: DataType.STRING(80), field: 'profissao'})
  profissao?: string;

  @Column({type: DataType.INTEGER, field: 'tabelaPrecoId'})
  tabelaPrecoId?: number;

  @Column({type: DataType.SMALLINT, field: 'escolaridade'})
  escolaridade?: number;

  @Column({type: DataType.BOOLEAN, field: 'isAtivo'})
  isAtivo?: boolean;

  @Column({type: DataType.BOOLEAN, field: 'isBlockSale'})
  isBlockSale?: boolean;

  @Column({type: DataType.BOOLEAN, field: 'isBloquearCompra'})
  isBloquearCompra?: boolean;
  

  @HasMany(() => PartnerContact, {as: 'contacts', foreignKey: 'partnerId'})
  contacts?: PartnerContact[];

  @HasMany(() => PartnerAddress, {as: 'address', foreignKey: 'partnerId'})
  address?: PartnerAddress[];

}