import { Transaction } from "sequelize";
import { EconomicActivity } from "../../database";
import crypto from "crypto";

export class EconomicActivityService {

    public static IsValid = (economicActivity: EconomicActivity) => {

        return { success: true };

    }

    public static Create = async (economicActivity: EconomicActivity, transaction?: Transaction) => {

        economicActivity.id = crypto.randomUUID();
        
        await EconomicActivity.create({...economicActivity}, {transaction});

    }

    public static Update = async (economicActivity: EconomicActivity, transaction?: Transaction) => {

        await EconomicActivity.update(economicActivity, {where: {id: economicActivity.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await EconomicActivity.update({ativo: false}, {where: {id: id}, transaction});
    }

}