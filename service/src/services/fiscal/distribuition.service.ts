import { Transaction } from "sequelize";
import { Dfe, DfeProcNfe, DfeResNfe } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class DistribuitionService {

    public static IsValid = (dfe: Dfe) => {

        return { success: true };

    }

    public static Create = async (dfe: Dfe, transaction: Transaction | undefined) => {

        dfe.id = crypto.randomUUID();

        for (let procNfe of dfe?.procNfes || []) {
            procNfe.id = crypto.randomUUID();
            procNfe.dfeId = dfe.id;
            procNfe.xml = procNfe.xml;
            await DfeProcNfe.create({...procNfe}, {transaction});
        }

        for (let resNfe of dfe?.resNfes || []) {
            resNfe.id = crypto.randomUUID();
            resNfe.dfeId = dfe.id;
            resNfe.xml = resNfe.xml;
            await DfeResNfe.create({...resNfe}, {transaction});
        }

        await Dfe.create({...dfe}, {transaction});

    }

    public static Update = async (dfe: Dfe, transaction?: Transaction) => {

        await Dfe.update(dfe, {where: {id: dfe.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Dfe.update({ativo: false}, {where: {id: id}, transaction});
    }

}