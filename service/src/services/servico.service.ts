import { Transaction } from "sequelize";
import { Servico } from "../database";
import crypto from "crypto";

export class ServicoService {

    public static IsValid = (servico: Servico) => {

        if (servico.descricao == '') {
            return { success: false, message: 'Informe a descrição!' };
        }

        return { success: true };

    }

    public static Create = async (servico: Servico, transaction: Transaction | undefined) => {

        servico.id = crypto.randomUUID();

        await Servico.create({...servico}, {transaction});

    }

    public static Update = async (servico: Servico, transaction: Transaction | undefined) => {

        await Servico.update(servico, {where: {id: servico.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Servico.update({ativo: false}, {where: {id: id}, transaction});
    }

}