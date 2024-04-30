import { Transaction } from "sequelize";
import { User, Vehicle } from "../../database";
import crypto from "crypto";

export class VehicleService {

    public static IsValid = (vehicle: Vehicle) => {

        return { success: true };

    }

    public static Create = async (vehicle: Vehicle, transaction?: Transaction) => {

        vehicle.id = crypto.randomUUID();
        
        await Vehicle.create({...vehicle}, {transaction});

    }

    public static Update = async (vehicle: Vehicle, transaction?: Transaction) => {

        await Vehicle.update(vehicle, {where: {id: vehicle.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await Vehicle.update({ativo: false}, {where: {id: id}, transaction});
    }

}