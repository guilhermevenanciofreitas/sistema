import { Request, Response } from "express";
import Auth from "../../auth";
import { FormaPagamento, Parceiro, PedidoVenda, Produto, PedidoVendaPagamento, PedidoVendaStatus, PedidoVendaTipoEntrega, Empresa } from "../../database";
import { PedidoVendaService } from "../../services/comercial/pedidovenda.service";
import { PedidoVendaItem } from "../../database/models/pedidoVendaItem.model";

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
                        {model: Parceiro, as: "cliente", attributes: ["id", "nome"]},
                        {model: PedidoVendaStatus, attributes: ["id", "descricao"]}
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

    async progressList(req: Request, res: Response) {
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
                        {model: Parceiro, as: "cliente", attributes: ["id", "nome"]},
                        {model: PedidoVendaStatus, attributes: ["id", "descricao"]}
                    ],
                    where, order, limit, offset, transaction});

                const status = await PedidoVendaStatus.findAll({order: [["ordem", "ASC"]], transaction});

                sequelize.close();

                res.status(200).json({...pedidoVenda, status, limit, offset: req.body.offset, filter, sort});

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async deliveryList(req: Request, res: Response) {
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
                        {model: Parceiro, as: "cliente", attributes: ["id", "nome"]},
                        {model: Parceiro, as: "entregador", attributes: ["id", "nome"]},
                    ],
                    where, order, limit, offset, transaction});

                const entregadores = await Parceiro.findAll({attributes: ["id", "nome"], where: {isFuncionario: true}, transaction});

                sequelize.close();

                res.status(200).json({...pedidoVenda, entregadores, limit, offset: req.body.offset, filter, sort});

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

                const pedidoVenda = await PedidoVenda.findOne({
                    attributes: ["id", "entrega"], 
                    include: [
                        {model: Parceiro, as: "cliente", attributes: ["id", "nome"]},
                        {model: Parceiro, as: "entregador", attributes: ["id", "nome"]},
                        {model: PedidoVendaStatus, attributes: ["id", "descricao"]},
                        {model: PedidoVendaTipoEntrega, attributes: ["id", "descricao"]},
                        {model: PedidoVendaItem, attributes: ["id", "quantidade", "valor"], include: [{model: Produto, attributes: ["id", "descricao"]}]},
                        {model: PedidoVendaPagamento, attributes: ["id", "valor"], include: [{model: FormaPagamento, attributes: ["id", "descricao"]}]},
                    ],
                    where: {id: req.body.id}, transaction}
                );
    
                sequelize.close();
    
                res.status(200).json(pedidoVenda);
    
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

    async progress(req: Request, res: Response) {
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await PedidoVendaService.Progress(req.body?.id, req.body?.statusId, transaction);

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

    async deliveryman(req: Request, res: Response) {
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await PedidoVendaService.Deliveryman(req.body?.id, req.body?.entregadorId, transaction);

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

    async delivery(req: Request, res: Response) {
        Auth(req, res).then(async ({sequelize, empresaId}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const ids = req.body?.ids;
                const entregadorId = req.body?.entregadorId;

                const empresa = await Empresa.findOne({attributes: ["endereco"], where: {id: empresaId}});
                
                //const pedidoVenda = await PedidoVenda.findAll({attributes: ["id", "entrega"], where: {id: ids}, transaction});

                await PedidoVendaService.Delivery(req.body?.id, req.body?.entregadorId, transaction);


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