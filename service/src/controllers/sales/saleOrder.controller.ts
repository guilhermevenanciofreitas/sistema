import { Request, Response } from "express";
import Auth from "../../auth";
import { PaymentForm, Partner, SaleOrder, Product, SaleOrderRecieve, SaleOrderStatus, PedidoVendaTipoEntrega, Company, Delivery, DeliveryRoute, PedidoVendaDeliveryRoute, ProdutoCombinacao, ProdutoCombinacaoGrupo, ProdutoCombinacaoItem, PedidoVendaItemCombinacao, PedidoVendaItemCombinacaoItem } from "../../database";
import { SaleOrderService } from "../../services/sales/saleOrder.service";
import { SaleOrderItem } from "../../database/models/saleOrderItem.model";
import {Op, Sequelize} from "sequelize";
import axios from "axios";
import { DisplayError } from "../../errors/DisplayError";
import { Error } from "../../errors";

export default class SaleOrderController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {finished: false};
                let order: any = [];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const saleOrders = await SaleOrder.findAndCountAll({
                    attributes: ["id"],
                    include: [
                        {model: Partner, as: "cliente", attributes: ["id", "nome"]},
                        {model: SaleOrderStatus, attributes: ["id", "descricao"]}
                    ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction});

                sequelize.close();

                res.status(200).json({
                    request: {
                        ...pagination
                    },
                    response: {
                        rows: saleOrders.rows, count: saleOrders.count
                    }
                });
                
            }
            catch (error: any) {
                Error.Response(res, error);
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
        
                let where: any = {finished: false};
                let order: any = [];
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const pedidoVenda = await SaleOrder.findAndCountAll({
                    attributes: ["id"],
                    include: [
                        {model: Partner, as: "cliente", attributes: ["id", "nome"]},
                        {model: SaleOrderStatus, attributes: ["id", "descricao"]}
                    ],
                    where, order, limit, offset, transaction});

                const status = await SaleOrderStatus.findAll({order: [["ordem", "ASC"]], transaction});

                sequelize.close();

                res.status(200).json({...pedidoVenda, status, limit, offset: req.body.offset, filter, sort});

            }
            catch (error: any) {
                Error.Response(res, error);
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
        
                let where: any = {}; //Sequelize.literal(`deliveryRoutes.deliveryRoute.delivery.finalizado IS NULL`);

                let order: any = [];
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const pedidoVenda = await SaleOrder.findAndCountAll({
                    attributes: ["id"],
                    include: [
                        {model: Partner, as: "cliente", attributes: ["id", "nome"]},
                        {model: Partner, as: "entregador", attributes: ["id", "nome"]},
                        {model: PedidoVendaDeliveryRoute, attributes: ["id"],
                            include: [{model: DeliveryRoute, attributes: ["id", "entregue", "cancelado"],
                                include: [{model: Delivery, attributes: ["id"]}]}]
                        },
                    ],
                    where, order, limit, offset, transaction});

                const entregadores = await Partner.findAll({attributes: ["id", "nome"], where: {isFuncionario: true}, transaction});

                sequelize.close();

                res.status(200).json({...pedidoVenda, entregadores, limit, offset: req.body.offset, filter, sort});

            }
            catch (error: any) {
                Error.Response(res, error);
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

                const pedidoVenda = await SaleOrder.findOne({
                    attributes: ["id", "entrega"], 
                    include: [
                        {model: Partner, as: "cliente", attributes: ["id", "nome"]},
                        {model: Partner, as: "entregador", attributes: ["id", "nome"]},
                        {model: SaleOrderStatus, attributes: ["id", "descricao"]},
                        {model: PedidoVendaTipoEntrega, attributes: ["id", "descricao"]},
                        {model: SaleOrderItem, attributes: ["id", "quantidade", "valor"], 
                            include: [{model: Product, attributes: ["id", "nome", "descricao"],
                                include: [{model: ProdutoCombinacao, attributes: ["id", "isObrigatorio", "minimo", "maximo"],
                                    include: [{model: ProdutoCombinacaoGrupo, attributes: ["id", "descricao"],
                                        include: [{model: ProdutoCombinacaoItem, attributes: ["id", "nome"]}]
                                    }]    
                                }],
                            },
                            {model: PedidoVendaItemCombinacao, attributes: ["id", "pedidoVendaItemId", "combinacaoId"],
                                include: [{model: PedidoVendaItemCombinacaoItem, attributes: ["id", "pedidoVendaItemCombinacaoId", "itemCombinacaoId", "quantidade"]}]
                            }]
                        },
                        {model: SaleOrderRecieve, attributes: ["id", "vencimento", "valor"], include: [{model: PaymentForm, attributes: ["id", "description"]}]},
                    ],
                    where: {id: req.body.id}, transaction}
                );
    
                sequelize.close();
    
                res.status(200).json(pedidoVenda);
    
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

                const PedidoVenda = req.body as SaleOrder;

                const valid = SaleOrderService.IsValid(PedidoVenda);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!PedidoVenda.id) {
                    await SaleOrderService.Create(PedidoVenda, transaction);
                } else {
                    await SaleOrderService.Update(PedidoVenda, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(PedidoVenda);

            }
            catch (error: any) {
                Error.Response(res, error);
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

                await SaleOrderService.Progress(req.body?.id, req.body?.statusId, transaction);

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

    async deliveryman(req: Request, res: Response) {
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await SaleOrderService.Deliveryman(req.body?.id, req.body?.entregadorId, transaction);

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

    async delivery(req: Request, res: Response) {
        Auth(req, res).then(async ({sequelize, empresaId}) => {
            try
            {

                const transaction = await sequelize.transaction();
               
                const ids = req.body?.ids;
                const entregadorId = req.body?.entregadorId;

                const empresa = await Company.findOne({attributes: ["endereco"], where: {id: empresaId}, transaction});
                
                const pedidoVenda = await SaleOrder.findAll({attributes: ["id", "entrega"], where: {id: ids}, transaction});

                let waypoints: any = pedidoVenda.map((c: any) => ({id: c.id, latitude: c.entrega.latitude, longitude: c.entrega.longitude}));

                let params = empresa?.endereco.longitude + "," + empresa?.endereco.latitude + ";";

                var waypoint_index = 1;

                for (let item of waypoints) {
                    item.waypoint_index = waypoint_index;
                    params += item.longitude + "," + item.latitude + ";";
                    waypoint_index++;
                }
                
                params = params.substring(0, params.length - 1);

                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + params + '?access_token=pk.eyJ1IjoiZ3VpdmVuYW5jaW8iLCJhIjoiY2x0dndjemo3MXBrZTJscXE2aWQ4a3RnOSJ9.NcSagSrZhTT7pR4DxyTIKg',
                    headers: {}
                };

                var delivery = new Delivery();

                delivery.entregadorId = entregadorId;

                await SaleOrderService.Delivery(delivery.dataValues, transaction);

                axios.request(config).then(async (response: any) => {

                    let data = [];

                    for (let item of response.data.waypoints) {
                        const r = waypoints.filter((c: any) => c.waypoint_index == item.waypoint_index);
                        if (r[0] != undefined) {
                            data.push({id: r[0].id});
                        }
                    }

                    let ordem = 1;
                    for (let item of data) {
                        
                        var deliveryRoute = new DeliveryRoute();
                        deliveryRoute.deliveryId = delivery.id;
                        deliveryRoute.ordem = ordem;
                        await SaleOrderService.DeliveryRoute(deliveryRoute.dataValues, transaction);
                        
                        var pedidoVendaDeliveryRoute = new PedidoVendaDeliveryRoute();
                        pedidoVendaDeliveryRoute.pedidoVendaId = item.id;
                        pedidoVendaDeliveryRoute.deliveryRouteId = deliveryRoute.id;
                        await SaleOrderService.PedidoVendaDeliveryRoute(pedidoVendaDeliveryRoute.dataValues, transaction);

                        ordem++;
                    }

                    transaction.commit();

                    res.status(200).json({success: true});

                }).catch((err: any) => {
                    res.status(500).json(err);
                });
                
                
                //res.status(200).json({success: true});
                //await PedidoVendaService.Delivery(req.body?.id, req.body?.entregadorId, transaction);

            }
            catch (error: any) {
                Error.Response(res, error);
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

                await SaleOrderService.Delete(req.body.id, transaction);

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