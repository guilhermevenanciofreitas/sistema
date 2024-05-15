import { Model, Table, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { PartnerContact } from "./partnerContact.model";
//import { PartnerAddress } from "./partnerAddress.model";
import { ProductSupplier } from "./productSupplier.model";
import { City } from "./city.model";

@Table({tableName: "partner"})
export class Partner extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.BOOLEAN, field: 'isCustomer'})
  isCustomer?: boolean;

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

  @Column({type: DataType.SMALLINT, field: 'maritalStatus'})
  maritalStatus?: number;

  @Column({type: DataType.STRING(20), field: 'rg'})
  rg?: string;

  @Column({type: DataType.STRING(30), field: 'ie'})
  ie?: string;

  @Column({type: DataType.STRING(30), field: 'im'})
  im?: string;

  @Column({type: DataType.SMALLINT, field: 'scholarity'})
  scholarity?: number;

  @Column({type: DataType.STRING(80), field: 'profession'})
  profession?: string;

  @Column({type: DataType.STRING(80), field: 'naturalness'})
  naturalness?: number;

  @Column({type: DataType.STRING(80), field: 'nationality'})
  nationality?: number;

  @Column({type: DataType.JSONB, field: 'address'})
  address?: any;

  @Column({type: DataType.BOOLEAN, field: 'isActive'})
  isActive?: boolean;

  @Column({type: DataType.BOOLEAN, field: 'isBlockSale'})
  isBlockSale?: boolean;

  @Column({type: DataType.BOOLEAN, field: 'isBlockBuy'})
  isBlockBuy?: boolean;
  
  //@BelongsTo(() => City, {as: 'city', foreignKey: "(address->>'cityId')::UUID"})
  //city?: City;

  @HasMany(() => PartnerContact, {as: 'contacts', foreignKey: 'partnerId'})
  contacts?: PartnerContact[];

  //@HasMany(() => PartnerAddress, {as: 'address', foreignKey: 'partnerId'})
  //address?: PartnerAddress[];

  @HasMany(() => ProductSupplier, {as: 'products', foreignKey: 'supplierId'})
  products?: ProductSupplier[];

}