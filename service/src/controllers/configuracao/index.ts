import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Auth, { Accounts, Database } from "../../auth";
import Sequelize, { Empresa } from "../../database";
import { EmpresaService } from "../../services/configuracao/index.service";

export default class ConfiguracaoController {

    
    async findOne(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const empresa = await Empresa.findOne({attributes: [
                    "id",
                    "cpfCnpj",
                    "razaoSocial",
                    "nomeFantasia",
                    "pedidoDigital",
                ],
                where: {id: req.body.id},
                transaction
                });
    
                res.status(200).json(empresa);

                sequelize.close();

            }
            catch (err)
            {
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

                const Empresa = req.body as Empresa;

                Empresa.cpfCnpj = req.body.cpfCnpj?.replace(/[^0-9]/g,'');
                
                const valid = EmpresaService.IsValid(Empresa);
    
                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }
    
                if (!Empresa.id) {
                    await EmpresaService.Create(Empresa, transaction);
                } else {
                    await EmpresaService.Update(Empresa, transaction);
                }
    
                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Empresa);

            }
            catch (err)
            {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

}