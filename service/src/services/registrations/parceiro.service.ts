import { Transaction } from "sequelize";
import { Parceiro, ParceiroContato } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";

export class ParceiroService {

    public static IsValid = (parceiro: Parceiro) => {

        if (parceiro.nome == '') {
            return { success: false, message: 'Informe o e-mail!' };
        }

        return { success: true };

    }

    public static Create = async (parceiro: Parceiro, transaction: Transaction | undefined) => {

        parceiro.id = crypto.randomUUID();

        for (let contato of parceiro?.contatos || []) {
            contato.id = crypto.randomUUID();
            contato.parceiroId = parceiro.id;
        }

        await Parceiro.create({...parceiro}, {transaction});

    }

    public static Update = async (parceiro: Parceiro, transaction: Transaction | undefined) => {

        for (let contato of parceiro?.contatos || []) {
            if (!contato.id) {
                contato.id = crypto.randomUUID();
                contato.parceiroId = parceiro.id;
                ParceiroContato.create({...contato}, {transaction});
            } else {
                ParceiroContato.update(contato, {where: {id: contato.id}, transaction});
            }
            ParceiroContato.destroy({where: {id: {[Op.notIn]: parceiro?.contatos?.filter(c => c.id != "").map(c => c.id)}}, transaction})
        }

        await Parceiro.update(parceiro, {where: {id: parceiro.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Parceiro.update({ativo: false}, {where: {id: id}, transaction});
    }

}