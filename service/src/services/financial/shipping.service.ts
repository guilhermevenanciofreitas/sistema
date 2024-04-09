import { Transaction } from "sequelize";
import { BankAccountShipping, BankAccountShippingPayment, Payment } from "../../database";
import crypto from "crypto";

export class ShippingService {

    public static IsValid = (payment: Payment) => {

        return { success: true };
        
    }

    public static UnShipping = async (bankAccountShipping: string[], transaction?: Transaction) => {

        console.log(bankAccountShipping);

        for (const bankAccountShippingId of bankAccountShipping) {

            const shipping = await BankAccountShipping.findOne({attributes: ['id'],
                include: [{model: BankAccountShippingPayment, attributes: ['paymentId']}],
                where: {id: bankAccountShippingId},
                transaction
            });

            for (const payment of shipping?.bankAccountShippingPayment || []) {
                await Payment.update({status: 'open'}, {where: {id: payment?.paymentId}, transaction});
            }

            await BankAccountShipping.update({status: 'canceled'}, {where: {id: shipping?.id}, transaction});

        }

    }

}