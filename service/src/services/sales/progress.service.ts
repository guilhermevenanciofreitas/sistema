import { Transaction } from "sequelize";
import { BankAccount, BankAccountShipping, BankAccountShippingPayment, Payment, SaleOrderStatus } from "../../database";
import crypto from "crypto";

export class ProgressService {

    public static IsValid = (saleOrderStatus: SaleOrderStatus) => {

        return { success: true };

    }

    public static Create = async (saleOrderStatus: SaleOrderStatus, transaction?: Transaction) => {

        saleOrderStatus.id = crypto.randomUUID();
        
        await SaleOrderStatus.create({...saleOrderStatus}, {transaction});

    }

    public static Update = async (saleOrderStatus: SaleOrderStatus, transaction?: Transaction) => {

        await SaleOrderStatus.update(saleOrderStatus, {where: {id: saleOrderStatus.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await BankAccount.update({ativo: false}, {where: {id: id}, transaction});
    }

}