import { Transaction } from "sequelize";
import { Company } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";

export class EmpresaService {

    public static IsValid = (empresa: Company) => {

        if (empresa.razaoSocial == '') {
            return { success: false, message: 'Informe a razão social!' };
        }

        return { success: true };

    }

    public static Create = async (empresa: Company, transaction: Transaction | undefined) => {

        empresa.id = crypto.randomUUID();

        await Company.create({...empresa}, {transaction});

    }

    public static Update = async (empresa: Company, transaction: Transaction | undefined) => {

        await Company.update(empresa, {where: {id: empresa.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Company.update({ativo: false}, {where: {id: id}, transaction});
    }

}