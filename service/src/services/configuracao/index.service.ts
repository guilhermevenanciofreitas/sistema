import { Transaction } from "sequelize";
import { Empresa, Parceiro, ParceiroContato } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";

export class EmpresaService {

    public static IsValid = (empresa: Empresa) => {

        if (empresa.razaoSocial == '') {
            return { success: false, message: 'Informe a razão social!' };
        }

        return { success: true };

    }

    public static Create = async (empresa: Empresa, transaction: Transaction | undefined) => {

        empresa.id = crypto.randomUUID();

        await Empresa.create({...empresa}, {transaction});

    }

    public static Update = async (empresa: Empresa, transaction: Transaction | undefined) => {

        await Empresa.update(empresa, {where: {id: empresa.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Empresa.update({ativo: false}, {where: {id: id}, transaction});
    }

}