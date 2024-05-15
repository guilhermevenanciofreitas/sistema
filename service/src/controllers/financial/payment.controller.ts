import { Request, Response } from "express";
import Auth from "../../auth";
import { Payment, Partner, PaymentForm, BankAccount, Company } from "../../database";
import {Op} from "sequelize";
import { PaymentService } from "../../services/financial/payment.service";
import { Bank } from "../../database/models/bank.model";
import _ from "lodash";

export default class PaymentController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                const status = req.body.status || undefined;
        
                let where: any = {};
                let order: any = [["dueDate", "asc"]];
        
                if (status) {
                    where = {"status": status};
                }

                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const contasPagar = await Payment.findAndCountAll(
                {
                    attributes: ['id', 'documentNumber', 'value', 'dueDate', 'scheduleDate', 'status'],
                    include: [
                        {model: Company, attributes: ['id', 'cpfCnpj', 'surname']},
                        {model: Partner, attributes: ['id', 'cpfCnpj', 'surname']},
                        {model: PaymentForm, attributes: ['id', 'description']},
                        {model: BankAccount, attributes: ['id', 'agency', 'agencyDigit', 'account', 'accountDigit'],
                            include: [{model: Bank, attributes: ['id', 'description', 'logo']}],
                        }
                    ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction
                });

                const pending = await Payment.findAndCountAll({attributes: ["value"], where: {status: 'pending'}, transaction});
                const open = await Payment.findAndCountAll({attributes: ["value"], where: {status: 'open'}, transaction});
                const shipping = await Payment.findAndCountAll({attributes: ["value"], where: {status: 'shipping'}, transaction});
                const send = await Payment.findAndCountAll({attributes: ["value"], where: {status: 'send'}, transaction});
                const scheduled = await Payment.findAndCountAll({attributes: ["value"], where: {status: 'scheduled'}, transaction});
                const paid = await Payment.findAndCountAll({attributes: ["value"], where: {status: 'paid'}, transaction});

                const status2 = {
                    pending: {count: pending.count, ammount: _.sum(pending.rows.map(c => parseFloat(c.value as any)))},
                    open: {count: open.count, ammount: _.sum(open.rows.map(c => parseFloat(c.value as any)))},
                    shipping: {count: shipping.count, ammount: _.sum(shipping.rows.map(c => parseFloat(c.value as any)))},
                    send: {count: send.count, ammount: _.sum(send.rows.map(c => parseFloat(c.value as any)))},
                    scheduled: {count: scheduled.count, ammount: _.sum(scheduled.rows.map(c => parseFloat(c.value as any)))},
                    paid: {count: paid.count, ammount: _.sum(paid.rows.map(c => parseFloat(c.value as any)))},
                }

                sequelize.close();

                res.status(200).json({
                    request: {
                        status: status, ...pagination
                    },
                    response: {
                        status: status2, rows: contasPagar.rows, count: contasPagar.count
                    }
                });

            }
            catch (err) {
                res.status(500).json(err);
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
                    //attributes: ['id', 'numeroDocumento', 'value', 'dueDate', 'scheduleDate', 'ourNumber', 'data'],
                    attributes: ['id', 'number', 'dueDate', 'scheduleDate', 'documentNumber', 'value', 'beneficiaryNotice', 'status'],
                    include: [
                        {model: Company, as: 'company', attributes: ["id", "surname"]},
                        {model: Partner, as: 'receiver', attributes: ["id", "surname"]},
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
    
    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await PaymentService.Delete(req.body.id, transaction);

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