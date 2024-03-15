import { Transaction } from "sequelize";
import { ContaPagar } from "../../database";
import crypto from "crypto";

export class ContaPagarService {

    public static IsValid = (contaPagar: ContaPagar) => {


        return { success: true };

    }

    public static Create = async (contaPagar: ContaPagar, transaction: Transaction | undefined) => {

        contaPagar.id = crypto.randomUUID();
        
        await ContaPagar.create({...contaPagar}, {transaction});

    }

    public static Update = async (contaPagar: ContaPagar, transaction: Transaction | undefined) => {

        await ContaPagar.update(contaPagar, {where: {id: contaPagar.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await ContaPagar.update({ativo: false}, {where: {id: id}, transaction});
    }

}