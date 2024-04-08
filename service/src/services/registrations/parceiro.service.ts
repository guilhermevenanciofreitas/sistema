import { Transaction } from "sequelize";
import { Partner, ParceiroContato } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";

export class PartnerService {

    public static IsValid = (partner: Partner) => {

        if (partner.nome == '') {
            return { success: false, message: 'Informe o e-mail!' };
        }

        return { success: true };

    }

    public static Create = async (partner: Partner, transaction: Transaction | undefined) => {

        partner.id = crypto.randomUUID();

        for (let contato of partner?.contatos || []) {
            contato.id = crypto.randomUUID();
            contato.parceiroId = partner.id;
        }

        await Partner.create({...partner}, {transaction});

    }

    public static Update = async (partner: Partner, transaction: Transaction | undefined) => {

        for (let contato of partner?.contatos || []) {
            if (!contato.id) {
                contato.id = crypto.randomUUID();
                contato.parceiroId = partner.id;
                ParceiroContato.create({...contato}, {transaction});
            } else {
                ParceiroContato.update(contato, {where: {id: contato.id}, transaction});
            }
            ParceiroContato.destroy({where: {parceiroId: partner.id, id: {[Op.notIn]: partner?.contatos?.filter(c => c.id != "").map(c => c.id)}}, transaction})
        }

        await Partner.update(partner, {where: {id: partner.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Partner.update({ativo: false}, {where: {id: id}, transaction});
    }

}