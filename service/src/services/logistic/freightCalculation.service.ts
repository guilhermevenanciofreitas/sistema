import { Transaction } from "sequelize";
import { FreightCalculation, FreightCalculationWeight, Nfe } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";

export class FreightCalculationService {

    public static IsValid = (freightCalculation: FreightCalculation) => {

        ///if (nfe.descricao == '') {
        //    return { success: false, message: 'Informe a descrição!' };
        //}

        return { success: true };

    }

    public static Create = async (freightCalculation: FreightCalculation, transaction?: Transaction) => {

        freightCalculation.id = crypto.randomUUID();

        for (let weight of freightCalculation?.weights || []) {
            weight.id = crypto.randomUUID();
            await FreightCalculationWeight.create({...weight}, {transaction})
        }

        await FreightCalculation.create({...freightCalculation}, {transaction});

    }

    public static Update = async (freightCalculation: FreightCalculation, transaction?: Transaction) => {

        for (let weight of freightCalculation?.weights || []) {
            if (!weight.id) {
                weight.id = crypto.randomUUID();
                await FreightCalculationWeight.create({...weight}, {transaction});
            } else {
                await FreightCalculationWeight.update(weight, {where: {id: weight.id}, transaction});
            }
            await FreightCalculationWeight.destroy({where: {freightCalculationId: freightCalculation.id, id: {[Op.notIn]: freightCalculation?.weights?.filter((c: any) => c.id != "").map(c => c.id)}}, transaction})
        }

        await FreightCalculation.update(freightCalculation, {where: {id: freightCalculation.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await FreightCalculation.update({ativo: false}, {where: {id: id}, transaction});
    }

}