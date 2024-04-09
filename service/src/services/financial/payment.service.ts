import { Transaction } from "sequelize";
import { Payment } from "../../database";
import crypto from "crypto";

export class PaymentService {

    public static IsValid = (payment: Payment) => {

        return { success: true };
        
    }

    public static Create = async (payment: Payment, transaction?: Transaction) => {

        payment.id = crypto.randomUUID();
        payment.status = 'open';
        
        await Payment.create({...payment}, {transaction});

    }

    public static Update = async (payment: Payment, transaction?: Transaction) => {

        await Payment.update(payment, {where: {id: payment.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await Payment.update({ativo: false}, {where: {id: id}, transaction});
    }

}