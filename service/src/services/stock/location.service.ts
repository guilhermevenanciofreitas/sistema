import { Transaction } from "sequelize";
import { StockLocation } from "../../database/models/stockLocation.model";
import crypto from "crypto";

export class LocationService {

    public static IsValid = (stockLocation: StockLocation) => {

        return { success: true };

    }

    public static Create = async (stockLocation: StockLocation, transaction?: Transaction) => {

        stockLocation.id = crypto.randomUUID();
        
        await StockLocation.create({...stockLocation}, {transaction});

    }

    public static Update = async (stockLocation: StockLocation, transaction?: Transaction) => {

        await StockLocation.update(stockLocation, {where: {id: stockLocation.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await StockLocation.update({ativo: false}, {where: {id: id}, transaction});
        
    }

}