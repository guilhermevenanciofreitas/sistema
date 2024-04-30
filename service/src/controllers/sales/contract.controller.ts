import { Request, Response } from "express";
import Auth from "../../auth";
import { Contract } from "../../database";
import { ContractService } from "../../services/sales/contract.service";
import {Op} from "sequelize";

export default class ContratoController {

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
        
                if (filter?.inicio) {
                    where = {"inicio": {[Op.iLike]: `%${filter?.inicio.replace(' ', "%")}%`}};
                }
        
                if (filter?.termino) {
                    where = {"termino": {[Op.iLike]: `%${filter?.termino}%`}};
                }
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const contracts = await Contract.findAndCountAll({attributes: ["id"], where, order, limit, offset, transaction});
        
                sequelize.close();

                res.status(200).json({rows: contracts.rows, count: contracts.count, limit, offset: req.body.offset, filter, sort});

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

                const contract = await Contract.findOne({attributes: ["id"], where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(contract);
    
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

                const contract = req.body as Contract;

                const valid = ContractService.IsValid(contract);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!contract.id) {
                    await ContractService.Create(contract, transaction);
                } else {
                    await ContractService.Update(contract, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(contract);

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

                await ContractService.Delete(req.body.id, transaction);

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