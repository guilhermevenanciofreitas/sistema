import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { User, Account } from "../index";

@Table({tableName: "accountUser"})
export class AccountUser extends Model {

  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: "id"})
  id?: string;

  @Column({type: DataType.UUID, field: "accountId"})
  accountId?: string;

  @Column({type: DataType.UUID, field: "userId"})
  userId?: string;

 

  @BelongsTo(() => Account, {foreignKey: 'accountId', targetKey: 'id'})
  Account?: Account;

  @BelongsTo(() => User, {foreignKey: 'userId', targetKey: 'id'})
  User?: User;

}