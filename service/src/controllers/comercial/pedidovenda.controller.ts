import { Request, Response } from "express";
import Auth from "../../auth";
import { Parceiro, PedidoVenda, Produto } from "../../database";
import { PedidoVendaService } from "../../services/comercial/pedidovenda.service";
import {Op} from "sequelize";
import { pedidoVendaItem } from "../../database/models/pedidoVendaItem.model";

export default class PedidoVendaController {

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
        
                const pedidoVenda = await PedidoVenda.findAndCountAll({
                    attributes: ["id"],
                    include: [
                        {model: Parceiro, attributes: ["id", "nome"]},
                    ],
                    where, order, limit, offset, transaction});
        
                sequelize.close();

                res.status(200).json({...pedidoVenda, limit, offset: req.body.offset, filter, sort});

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

                const contrato = await PedidoVenda.findOne({
                    attributes: ["id", "entrega"], 
                    include: [
                        {model: Parceiro, attributes: ["id", "nome"]},
                        {model: pedidoVendaItem, attributes: ["id"], include: [{model: Produto, attributes: ["id", "descricao"]}]},
                    ],
                    where: {id: req.body.id}, transaction}
                );
    
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

                const Contrato = req.body as PedidoVenda;

                const valid = PedidoVendaService.IsValid(Contrato);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Contrato.id) {
                    await PedidoVendaService.Create(Contrato, transaction);
                } else {
                    await PedidoVendaService.Update(Contrato, transaction);
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

                await PedidoVendaService.Delete(req.body.id, transaction);

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