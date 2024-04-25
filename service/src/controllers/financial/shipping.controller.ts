import { Request, Response } from "express";
import Auth from "../../auth";
import { Payment, Partner, PaymentForm, BankAccount, Company, BankAccountShipping, BankAccountShippingPayment } from "../../database";
import {Op} from "sequelize";
import { PaymentService } from "../../services/financial/payment.service";
import { Bank } from "../../database/models/bank.model";
import _ from "lodash";
import { Error } from "../../errors";
import { ShippingService } from "../../services/financial/shipping.service";

export default class ShippingController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [["createdAt", "desc"]];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const bankAccountShipping = await BankAccountShipping.findAndCountAll({
                    attributes: ["id", "status", "createdAt"],
                    include: [
                        {model: Company, attributes: ['id', 'nomeFantasia']},
                        {model: BankAccount, attributes: ['id', 'agency', 'agencyDigit', 'account', 'accountDigit'],
                            include: [{model: Bank, attributes: ['id', 'logo']}]
                        },
                        {model: BankAccountShippingPayment, attributes: ['id']},
                    ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction
                });
        
                sequelize.close();

                res.status(200).json({
                    request: {
                        ...pagination
                    },
                    response: {
                        rows: bankAccountShipping.rows, count: bankAccountShipping.count
                    }
                });

            }
            catch (error: any) {
                Error.Response(res, error);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const contaPagar = await Payment.findOne({
                    attributes: ["id", "numeroDocumento", "valor", "emissao", "vencimento", "ourNumber", "data"],
                    include: [
                        {model: Partner, attributes: ["id", "nome"]},
                        {model: Company, attributes: ["id", "nomeFantasia"]},
                        {model: BankAccount, attributes: ["id", "agency", "agencyDigit", "account", "accountDigit"], include: [{model: Bank, attributes: ["description"]}]},
                        {model: PaymentForm, attributes: ["id", "description", "type"]},
                    ],
                    where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(contaPagar);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

    async save(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const payment = req.body as Payment;

                const valid = PaymentService.IsValid(payment);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!payment.id) {
                    await PaymentService.Create(payment, transaction);
                } else {
                    await PaymentService.Update(payment, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(payment);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });

    }
    
    async unShipping(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const bankAccountShipping = req.body.bankAccountShipping;

                const transaction = await sequelize.transaction();

                await ShippingService.UnShipping(bankAccountShipping, transaction);

                await transaction?.commit();

                sequelize.close();

                res.status(200).json({success: true});

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

}