import { Transaction } from "sequelize";
import { Called } from "../../database";
import crypto from "crypto";

export class CalledService {

    public static IsValid = (called: Called) => {

        return { success: true };

    }

    public static Create = async (called: Called, transaction?: Transaction) => {

        called.id = crypto.randomUUID();
        called.status = 'open';
        called.createdAt = new Date();
        
        await Called.create({...called}, {transaction});

    }

    public static Update = async (called: Called, transaction?: Transaction) => {

        await Called.update(called, {where: {id: called.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await Called.update({ativo: false}, {where: {id: id}, transaction});
    }

}