import { Request, Response } from "express";
import Auth from "../../auth";
import { Company, Dfe, Nfe, State } from "../../database";
import { NfeService } from "../../services/fiscal/nfe.service";
import { Op } from "sequelize";
import axios from "axios";
import { DistribuitionService } from "../../services/fiscal/distribuition.service";

export default class DistribuitionController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                const limit = req.body.limit || undefined;
                const offset = ((req.body.offset - 1) * limit) || undefined;
                const filter = req.body.filter || undefined;
                const sort = req.body.sort || undefined;
        
                let where: any = {};
                let order: any = [];
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const produtos = await Nfe.findAndCountAll({attributes: [
                    "id",
                    [sequelize.json('ide.nNF'), 'numero'],
                    [sequelize.json('ide.serie'), 'serie'],
                    [sequelize.json('emit.xFant'), 'emitente'],
                    [sequelize.json('dest.xNome'), 'destinatario'],
                    [sequelize.json('total.ICMSTot.vNF'), 'valor'],
                ],
                    where, order, limit, offset, transaction
                });
        
                sequelize.close();

                res.status(200).json({rows: produtos.rows, count: produtos.count, limit, offset: req.body.offset, filter, sort});

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message});
        });
    }

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const nfes = await Nfe.findOne({attributes: ["id"], 
                    where: {id: req.body.id}, transaction
                });

                sequelize.close();
    
                res.status(200).json(nfes);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

    async interest(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, companyId}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const company = await Company.findOne(
                {
                    attributes: ['id', 'cpfCnpj', 'address', 'certificate'],
                    where: {id: companyId},
                    transaction
                });

                const state = await State.findOne({attributes: ['id', 'acronym'], where: {id: company?.address?.stateId}, transaction});

                const dfe = await Dfe.findOne({attributes: ['ultNSU'], order: [['ultNSU', 'desc']], transaction});

                const ultNSU = dfe == null ? '000000000000000' : dfe.ultNSU;

                const request = {certificate: {file: company?.certificate.file, password: company?.certificate.password}, cpfCnpj: company?.cpfCnpj, acronym: state?.acronym, ultNSU};

                const response = await axios.post('http://localhost:5277/nfe/interest', request);

                if (response.status == 201) {
                    res.status(201).json(response.data);
                    return;
                }
                
                DistribuitionService.Create(response.data as Dfe, transaction);
    
                res.status(200).json({success: true});

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

                const Nfe = req.body as Nfe;

                const valid = NfeService.IsValid(Nfe);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Nfe.id) {
                    await NfeService.Create(Nfe, transaction);
                } else {
                    await NfeService.Update(Nfe, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Nfe);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });

    }

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await NfeService.Delete(req.body.id, transaction);

                await transaction?.commit();

                sequelize.close();

                res.status(200).json({success: true});

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

}