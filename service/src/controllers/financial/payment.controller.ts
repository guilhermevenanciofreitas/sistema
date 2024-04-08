import { Request, Response } from "express";
import Auth from "../../auth";
import { Payment, Partner, FormOfPayment, BankAccount, Company } from "../../database";
import {Op} from "sequelize";
import { PaymentService } from "../../services/financial/payment.service";
import { Bank } from "../../database/models/bank.model";
import _ from "lodash";

export default class PaymentController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                const limit = req.body.limit || undefined;
                const offset = ((req.body.offset - 1) * limit) || undefined;
                const filter = req.body.filter || undefined;
                const sort = req.body.sort || undefined;
                const status = req.body.status || undefined;
        
                let where: any = {};
                let order: any = [["vencimento", "asc"]];
        
                if (status) {
                    where = {"status": status};
                }

                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const contasPagar = await Payment.findAndCountAll(
                {
                    attributes: ["id", "numeroDocumento", "valor", "emissao", "vencimento", "status"],
                    include: [
                        {model: Company, attributes: ["id", "nomeFantasia"]},
                        {model: Partner, attributes: ["id", "nome"]},
                        {model: FormOfPayment, attributes: ["id", "description"]},
                        {model: BankAccount, attributes: ["id", "agency", "agencyDigit", "account", "accountDigit"],
                            include: [{model: Bank, attributes: ["id", "description", "logo"]}],
                        }
                    ],
                    where, order, limit, offset, transaction
                });

                const pending = await Payment.findAndCountAll({attributes: ["valor"], where: {status: 'pending'}, transaction});
                const open = await Payment.findAndCountAll({attributes: ["valor"], where: {status: 'open'}, transaction});
                const shipping = await Payment.findAndCountAll({attributes: ["valor"], where: {status: 'shipping'}, transaction});
                const send = await Payment.findAndCountAll({attributes: ["valor"], where: {status: 'send'}, transaction});
                const scheduled = await Payment.findAndCountAll({attributes: ["valor"], where: {status: 'scheduled'}, transaction});
                const paid = await Payment.findAndCountAll({attributes: ["valor"], where: {status: 'paid'}, transaction});

                const status2 = {
                    pending: {count: pending.count, ammount: _.sum(pending.rows.map(c => c.valor))},
                    open: {count: open.count, ammount: _.sum(open.rows.map(c => c.valor))},
                    shipping: {count: shipping.count, ammount: _.sum(shipping.rows.map(c => c.valor))},
                    send: {count: send.count, ammount: _.sum(send.rows.map(c => c.valor))},
                    scheduled: {count: scheduled.count, ammount: _.sum(scheduled.rows.map(c => c.valor))},
                    paid: {count: paid.count, ammount: _.sum(paid.rows.map(c => c.valor))},
                }

                sequelize.close();

                res.status(200).json({status: status2, rows: contasPagar.rows, count: contasPagar.count, limit, offset: req.body.offset, filter, sort});

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
                    attributes: ["id", "numeroDocumento", "valor", "emissao", "vencimento", "ourNumber"],
                    include: [
                        {model: Partner, attributes: ["id", "nome"]},
                        {model: BankAccount, attributes: ["id", "agency", "agencyDigit", "account", "accountDigit"], include: [{model: Bank, attributes: ["description"]}]},
                        {model: FormOfPayment, attributes: ["id", "description", "type"]},
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

                const ContaPagar = req.body as Payment;

                ContaPagar.recebedorId = req.body.recebedor?.id || null;

                const valid = PaymentService.IsValid(ContaPagar);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!ContaPagar.id) {
                    await PaymentService.Create(ContaPagar, transaction);
                } else {
                    await PaymentService.Update(ContaPagar, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(ContaPagar);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });

    }

    /*
    async update(req: Request, res: Response) {
        
        Auth(req, res).then(async ({transaction}) => {

            const Usuario = req.body as Usuario;

            const valid = UsuarioService.IsValid(Usuario);

            if (!valid.success) {
                res.status(201).json(valid);
                return;
            }

            await UsuarioService.Update(Usuario, transaction);

            await transaction?.commit();
            
            res.status(200).json(Usuario);
            
        }).catch((err) => {
            res.status(500).json(err);
        });
       
    }
    */

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