import { Request, Response } from "express";
import Auth from "../../auth";
import { Payment, Partner, PaymentForm, BankAccount } from "../../database";
import { Bank } from "../../database/models/bank.model";
import { BankAccountService } from "../../services/financial/bankAccount.service";
import { Error } from "../../errors";

export default class BankAccountController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                const bankAccounts = await BankAccount.findAll({attributes: ['id', 'agency', 'agencyDigit', 'account', 'accountDigit', 'balance'],
                    include: [
                        {model: Bank, attributes: ['id', 'description', 'logo']},
                    ],
                    order: [['id', 'asc']],
                    transaction
                });

                const payments = await Payment.findAll({
                    attributes: ['id', 'dueDate', 'value'],
                    include: [
                        {model: PaymentForm, attributes: ['id', 'description']},
                        {model: Partner, attributes: ['id', 'surname']},
                        {model: BankAccount, attributes: ['id']},
                    ],
                    where: {status: 'open'},
                    transaction
                });

                sequelize.close();

                res.status(200).json({response: {bankAccounts, payments: payments}});

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

                const contaPagar = await BankAccount.findOne({
                    attributes: ['id', 'agency', 'agencyDigit', 'account', 'accountDigit'],
                    include: [{model: Bank, attributes: ['id', 'description']}],
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

    async changeBankAccountPayment(req: Request, res: Response) {
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await BankAccountService.ChangeBankAccount(req.body?.id, req.body?.bankAccountId, transaction);

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json({success: true});

            }
            catch (error: any) {
                Error.Response(res, error);
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

                const bankAccount = req.body as BankAccount;

                const valid = BankAccountService.IsValid(bankAccount);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!bankAccount.id) {
                    await BankAccountService.Create(bankAccount, transaction);
                } else {
                    await BankAccountService.Update(bankAccount, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(bankAccount);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });

    }

    async shipping(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize, companyId}) => {

            const transaction = await sequelize.transaction();

            const bankAccountId = req.body.bankAccountId;
            const payments = req.body.payments;

            await BankAccountService.Shipping(companyId, bankAccountId, payments, transaction);

            await transaction?.commit();

            sequelize.close();

            res.status(200).json({success: true});
            
        }).catch((err) => {
            res.status(500).json(err);
        });
       
    }

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await BankAccountService.Delete(req.body.id, transaction);

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