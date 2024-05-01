import { Transaction } from "sequelize";
import { Stock } from "../../database/models/stock.model";
import crypto from "crypto";

export class LocationService {

    public static IsValid = (stock: Stock) => {

        return { success: true };

    }

    public static Create = async (stock: Stock, transaction?: Transaction) => {

        stock.id = crypto.randomUUID();
        
        await Stock.create({...stock}, {transaction});

    }

    public static Update = async (stock: Stock, transaction?: Transaction) => {

        await Stock.update(stock, {where: {id: stock.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await Stock.update({ativo: false}, {where: {id: id}, transaction});
        
    }

}