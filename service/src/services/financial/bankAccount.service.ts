import { Transaction } from "sequelize";
import { BankAccount } from "../../database";
import crypto from "crypto";

export class BankAccountService {

    public static IsValid = (bankAccount: BankAccount) => {


        return { success: true };

    }

    public static Create = async (bankAccount: BankAccount, transaction: Transaction | undefined) => {

        bankAccount.id = crypto.randomUUID();
        bankAccount.bankId = bankAccount.bank?.id;
        
        await BankAccount.create({...bankAccount}, {transaction});

    }

    public static Update = async (bankAccount: BankAccount, transaction: Transaction | undefined) => {

        bankAccount.bankId = bankAccount.bank?.id;

        await BankAccount.update(bankAccount, {where: {id: bankAccount.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await BankAccount.update({ativo: false}, {where: {id: id}, transaction});
    }

}