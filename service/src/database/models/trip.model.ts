import { Model, Table, Column, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { TripCte } from "./tripCte.model";
import { Company } from "./company.model";
import { Partner } from "./partner.model";
import { Vehicle } from "./vehicle.model";
import { TripShippingOrder } from "./tripShippingOrder.model";
import { TripVehicle } from "./tripVehicle.model";

@Table({tableName: 'trip'})
export class Trip extends Model {
  
  @Column({type: DataType.UUID, primaryKey: true, autoIncrement: true, field: 'id'})
  id?: string;

  @Column({type: DataType.UUID, field: 'companyId'})
  companyId?: string;

  @Column({type: DataType.STRING(15), field: 'type'})
  type?: string;

  @Column({type: DataType.STRING(30), field: 'number'})
  number?: string;

  @Column({type: DataType.UUID, field: 'driverId'})
  driverId?: string;

  @Column({type: DataType.UUID, field: 'vehicleId'})
  vehicleId?: string;


  @BelongsTo(() => Company, {as: 'company', foreignKey: 'companyId'})
  company?: Company;

  @BelongsTo(() => Partner, {as: 'driver', foreignKey: 'driverId'})
  driver?: Partner;

  @BelongsTo(() => Vehicle, {as: 'vehicle', foreignKey: 'vehicleId'})
  vehicle?: Vehicle;

  @HasMany(() => TripVehicle, {as: 'vehicles', foreignKey: 'tripId'})
  vehicles?: TripVehicle[];

  @HasMany(() => TripShippingOrder, {as: 'shippingOrders', foreignKey: 'tripId'})
  shippingOrders?: TripShippingOrder[];

  @HasMany(() => TripCte, {as: 'ctes', foreignKey: 'tripId'})
  ctes?: TripCte[];
  

}