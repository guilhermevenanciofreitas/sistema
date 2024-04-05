import { Request, Response } from "express";
import Auth from "../../auth";
import { Contrato } from "../../database";
import { ContratoService } from "../../services/sales/contrato.service";
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
        
                const contratos = await Contrato.findAndCountAll({attributes: ["id"], where, order, limit, offset, transaction});
        
                sequelize.close();

                res.status(200).json({rows: contratos.rows, count: contratos.count, limit, offset: req.body.offset, filter, sort});

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

                const contrato = await Contrato.findOne({attributes: ["id"], where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(contrato);
    
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

                const Contrato = req.body as Contrato;

                const valid = ContratoService.IsValid(Contrato);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Contrato.id) {
                    await ContratoService.Create(Contrato, transaction);
                } else {
                    await ContratoService.Update(Contrato, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Contrato);

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

                await ContratoService.Delete(req.body.id, transaction);

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