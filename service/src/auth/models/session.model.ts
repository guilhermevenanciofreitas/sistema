import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { User, Account } from "../index";

@Table({tableName: "session"})
export class Session extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "userId"})
  userId?: string;

  @Column({type: DataType.UUID, field: "accountId"})
  accountId?: string;

  @Column({type: DataType.UUID, field: "companyId"})
  companyId?: string;

  @Column({type: DataType.DATE, field: "lastAcess"})
  lastAcess?: Date;

  @BelongsTo(() => User, {foreignKey: 'userId', targetKey: 'id'})
  Database?: User;

  @BelongsTo(() => Account, {foreignKey: 'accountId', targetKey: 'id'})
  Account?: Account;

}