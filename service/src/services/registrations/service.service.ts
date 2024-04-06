import { Transaction } from "sequelize";
import { Service } from "../../database";
import crypto from "crypto";

export class ServiceService {

    public static IsValid = (service: Service) => {

        if (service.descricao == '') {
            return { success: false, message: 'Informe a descrição!' };
        }

        return { success: true };

    }

    public static Create = async (service: Service, transaction: Transaction | undefined) => {

        service.id = crypto.randomUUID();

        await Service.create({...service}, {transaction});

    }

    public static Update = async (service: Service, transaction: Transaction | undefined) => {

        await Service.update(service, {where: {id: service.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Service.update({ativo: false}, {where: {id: id}, transaction});
    }

}