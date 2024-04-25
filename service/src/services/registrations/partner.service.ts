import { Transaction } from "sequelize";
import { Partner, PartnerContact } from "../../database";
import crypto from "crypto";
import {Op} from "sequelize";

export class PartnerService {

    public static IsValid = (partner: Partner) => {

        if (partner.name == '') {
            return { success: false, message: 'Informe a razão social!' };
        }

        return { success: true };

    }

    public static Create = async (partner: Partner, transaction: Transaction | undefined) => {

        partner.id = crypto.randomUUID();

        for (let contact of partner?.contacts || []) {
            contact.id = crypto.randomUUID();
            contact.partnerId = partner.id;
        }

        await Partner.create({...partner}, {transaction});

    }

    public static Update = async (partner: Partner, transaction: Transaction | undefined) => {

        for (let contact of partner?.contacts || []) {
            if (!contact.id) {
                contact.id = crypto.randomUUID();
                contact.partnerId = partner.id;
                await PartnerContact.create({...contact}, {transaction});
            } else {
                await PartnerContact.update(contact, {where: {id: contact.id}, transaction});
            }
            await PartnerContact.destroy({where: {parceiroId: partner.id, id: {[Op.notIn]: partner?.contacts?.filter(c => c.id != "").map(c => c.id)}}, transaction})
        }

        await Partner.update(partner, {where: {id: partner.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Partner.update({ativo: false}, {where: {id: id}, transaction});
    }

}