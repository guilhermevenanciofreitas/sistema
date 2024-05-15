import { Transaction } from "sequelize";
import { Combination } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class CombinationService {

    public static IsValid = (combination: Combination) => {

        return { success: true };

    }

    public static Create = async (combination: Combination, transaction?: Transaction) => {

        combination.id = crypto.randomUUID();
      
        await Combination.create({...combination}, {transaction});

    }

    public static Update = async (combination: Combination, transaction?: Transaction) => {

        await Combination.update(combination, {where: {id: combination.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await Combination.update({ativo: false}, {where: {id: id}, transaction});

    }

}