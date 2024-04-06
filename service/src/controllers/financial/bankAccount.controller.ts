import { Request, Response } from "express";
import Auth from "../../auth";
import { Payment, Parceiro, FormOfPayment, BankAccount } from "../../database";
import {Op} from "sequelize";
import { Bank } from "../../database/models/bank.model";
import { BankAccountService } from "../../services/financial/bankAccount.service";

export default class BankAccountController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                const bankAccounts = await BankAccount.findAll({attributes: ["id"],
                    include: [
                        {model: Bank, attributes: ["id", "description"]},
                    ],
                    transaction
                });

                sequelize.close();

                res.status(200).json({bankAccounts, rows: []});

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
                    attributes: ["id", "numeroDocumento", "valor", "emissao", "vencimento"],
                    include: [
                        {model: Parceiro, attributes: ["id", "nome"]},
                        {model: FormOfPayment, attributes: ["id", "description"]},
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