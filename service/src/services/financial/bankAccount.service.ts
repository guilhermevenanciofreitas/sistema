import { Transaction } from "sequelize";
import { BankAccount, BankAccountShipping, BankAccountShippingPayment, Payment } from "../../database";
import crypto from "crypto";

export class BankAccountService {

    public static IsValid = (bankAccount: BankAccount) => {


        return { success: true };

    }

    public static Create = async (bankAccount: BankAccount, transaction?: Transaction) => {

        bankAccount.id = crypto.randomUUID();
        bankAccount.bankId = bankAccount.bank?.id;
        
        await BankAccount.create({...bankAccount}, {transaction});

    }

    public static Update = async (bankAccount: BankAccount, transaction?: Transaction) => {

        bankAccount.bankId = bankAccount.bank?.id;

        await BankAccount.update(bankAccount, {where: {id: bankAccount.id}, transaction});

    }

    public static Shipping = async (companyId: string, bankAccountId: string, payments: string[], transaction?: Transaction) => {

        var bankAccountShipping = new BankAccountShipping();

        bankAccountShipping.id = crypto.randomUUID();
        bankAccountShipping.companyId = companyId;
        bankAccountShipping.bankAccountId = bankAccountId;
        bankAccountShipping.status = 'pending';
        bankAccountShipping.createdAt = new Date();

        await BankAccountShipping.create({...bankAccountShipping.dataValues, transaction});

        for (const paymentId of payments) {
            var bankAccountShippingPayment = new BankAccountShippingPayment();
            bankAccountShippingPayment.bankAccountShippingId = bankAccountShipping.id;
            bankAccountShippingPayment.paymentId = paymentId;
            await BankAccountShippingPayment.create({...bankAccountShippingPayment.dataValues}, {transaction});
            await Payment.update({status: 'shipping'}, {where: {id: paymentId}, transaction});
        }

    }

    public static ChangeBankAccount = async (id: string, bankAccountId: string, transaction: Transaction) => {

        await Payment.update({bankAccountId: bankAccountId}, {where: {id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await BankAccount.update({ativo: false}, {where: {id: id}, transaction});
    }

}