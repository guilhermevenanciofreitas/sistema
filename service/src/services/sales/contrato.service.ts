import { Transaction } from "sequelize";
import { Contrato } from "../../database";
import crypto from "crypto";

export class ContratoService {

    public static IsValid = (contrato: Contrato) => {

        if (contrato.cliente?.id == null) {
            return { success: false, message: 'Informe o cliente!' };
        }

        return { success: true };

    }

    public static Create = async (contrato: Contrato, transaction: Transaction | undefined) => {

        contrato.id = crypto.randomUUID();
        
        await Contrato.create({...contrato}, {transaction});

    }

    public static Update = async (contrato: Contrato, transaction: Transaction | undefined) => {

        await Contrato.update(contrato, {where: {id: contrato.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Contrato.update({ativo: false}, {where: {id: id}, transaction});
    }

}