import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";

@Table({tableName: "nfe"})
export class Nfe extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.JSONB, field: "ide"})
  ide?: any;

  @Column({type: DataType.JSONB, field: "emit"})
  emit?: any;

  @Column({type: DataType.JSONB, field: "dest"})
  dest?: any;

  @Column({type: DataType.JSONB, field: "autXML"})
  autXML?: any;

  @Column({type: DataType.JSONB, field: "det"})
  det?: any;

  @Column({type: DataType.JSONB, field: "total"})
  total?: any;

  @Column({type: DataType.JSONB, field: "transp"})
  transp?: any;

  @Column({type: DataType.JSONB, field: "cobr"})
  cobr?: any;
  
  @Column({type: DataType.JSONB, field: "pag"})
  pag?: any;
  
  @Column({type: DataType.JSONB, field: "infAdic"})
  infAdic?: any;
  
  @Column({type: DataType.JSONB, field: "exporta"})
  exporta?: any;
  
  @Column({type: DataType.JSONB, field: "infRespTec"})
  infRespTec?: any;

  @Column({type: DataType.JSONB, field: "signature"})
  signature?: any;
  
  @Column({type: DataType.JSONB, field: "protNFe"})
  protNFe?: any;


}