import { Transaction } from "sequelize";
import { Contract } from "../../database";
import crypto from "crypto";

export class ContractService {

    public static IsValid = (contract: Contract) => {

        if (contract.cliente?.id == null) {
            return { success: false, message: 'Informe o cliente!' };
        }

        return { success: true };

    }

    public static Create = async (contract: Contract, transaction?: Transaction) => {

        contract.id = crypto.randomUUID();
        
        await Contract.create({...contract}, {transaction});

    }

    public static Update = async (contract: Contract, transaction?: Transaction) => {

        await Contract.update(contract, {where: {id: contract.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Contract.update({ativo: false}, {where: {id: id}, transaction});
    }

}