import { Transaction } from "sequelize";
import { StockIn } from "../../database";
import crypto from "crypto";

export class StockInService {

    public static IsValid = (stock: StockIn) => {

        return { success: true };

    }

    public static Create = async (stockIn: StockIn, transaction?: Transaction) => {

        stockIn.id = crypto.randomUUID();
        
        await StockIn.create({...stockIn}, {transaction});

    }

    public static Update = async (stockIn: StockIn, transaction?: Transaction) => {

        await StockIn.update(stockIn, {where: {id: stockIn.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await StockIn.update({ativo: false}, {where: {id: id}, transaction});
        
    }

}