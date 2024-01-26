import { Transaction } from "sequelize";
import { Parceiro } from "../database";
import crypto from "crypto";

export class ParceiroService {

    public static IsValid = (parceiro: Parceiro) => {

        if (parceiro.nome == '') {
            return { success: false, message: 'Informe o e-mail!' };
        }

        return { success: true };

    }

    public static Create = async (parceiro: Parceiro, transaction: Transaction | undefined) => {

        parceiro.id = crypto.randomUUID();
        
        await Parceiro.create({...parceiro}, {transaction});

    }

    public static Update = async (parceiro: Parceiro, transaction: Transaction | undefined) => {

        const id = parceiro.id ? await Parceiro.findOne({where: {id: parceiro.id}, transaction}) : undefined;

        await Parceiro.update(parceiro, {where: {id: parceiro.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Parceiro.update({ativo: false}, {where: {id: id}, transaction});
    }

}