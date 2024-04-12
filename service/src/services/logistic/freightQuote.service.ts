import { Transaction } from "sequelize";
import { FreightQuote, Nfe } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class FreightQuoteService {

    public static IsValid = (freightQuote: FreightQuote) => {

        return { success: true };

    }

    public static Create = async (freightQuote: FreightQuote, transaction?: Transaction) => {

        freightQuote.id = crypto.randomUUID();

        await FreightQuote.create({...freightQuote}, {transaction});

    }

    public static Update = async (freightQuote: FreightQuote, transaction?: Transaction) => {

        await FreightQuote.update(freightQuote, {where: {id: freightQuote.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {

        await FreightQuote.update({ativo: false}, {where: {id: id}, transaction});
        
    }

}