import { Request, Response } from "express";
import Auth from "../../auth";
import { PaymentForm, Partner, SaleOrder, Product, SaleOrderReceivie, SaleOrderStatus, SaleOrderShippingType, Company, Delivery, DeliveryRoute, SaleOrderDeliveryRoute, ProductCombination, ProductCombinationGroup, ProductCombinationItem, SaleOrderItemCombination, SaleOrderItemCombinationItem, ReceivieForm } from "../../database";
import { SaleOrderService } from "../../services/sales/saleOrder.service";
import { SaleOrderItem } from "../../database/models/saleOrderItem.model";
import {Op, Sequelize} from "sequelize";
import axios from "axios";
import { DisplayError } from "../../errors/DisplayError";
import { Error } from "../../errors";
import _ from "lodash";

export default class SaleOrderController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [['createdAt', 'desc']];

                const statusId = req.body.statusId;
        
                if (statusId != null) {
                    where = [{'statusId': statusId == '' ? null : statusId}];
                }

                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const saleOrders = await SaleOrder.findAndCountAll({
                    attributes: ['id', 'number', 'statusId', 'createdAt', 'value'],
                    include: [
                        {model: Partner, as: 'costumer', attributes: ['id', 'surname']},
                        {model: Company, as: 'company', attributes: ['id', 'surname']},
                        {model: Partner, as: 'seller', attributes: ['id', 'surname']},
                        {model: SaleOrderStatus, as: 'status', attributes: ['id', 'description', 'color']}
                    ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction});

                var saleOrderStatus = await SaleOrderStatus.findAll({
                    attributes: ['id', 'description', 'color'],
                    include: [{model: SaleOrder, attributes: ['statusId', 'value']}],
                    order: [['ordem', 'asc']],
                    transaction
                });

                let status = [];

                for (const item of saleOrderStatus) {
                    const sales = _.filter(item.saleOrders, (sale: SaleOrder) => sale.statusId == item.dataValues.id);
                    status.push({
                        ...item.dataValues,
                        quantity: _.size(sales),
                        ammount: _.sum(_.map(sales, (c: SaleOrder) => parseFloat(c?.value?.toString() || '0')))
                    });
                }

                sequelize.close();

                res.status(200).json({
                    request: {
                        statusId, ...pagination
                    },
                    response: {
                        saleOrderStatus: status, rows: saleOrders.rows, count: saleOrders.count
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
                        {model: SaleOrderDeliveryRoute, attributes: ["id"],
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

                const saleOrder = await SaleOrder.findOne({
                    attributes: ['id', 'number', 'createdAt', 'shippingAddress'], 
                    include: [
                        {model: Partner, as: "costumer", attributes: ["id", "surname"]},
                        {model: Company, as: 'company', attributes: ['id', 'surname']},
                        {model: Partner, as: "seller", attributes: ["id", "surname"]},
                        {model: Partner, as: "shippingCompany", attributes: ["id", "surname"]},
                        {model: SaleOrderStatus, attributes: ['id', 'description', 'color']},
                        {model: SaleOrderShippingType, attributes: ["id", "description"]},
                        {model: SaleOrderItem, attributes: ['id', 'quantity', 'value', 'discount'], 
                            include: [{model: Product, attributes: ["id", "name", "description"],
                                include: [{model: ProductCombination, attributes: ["id", "isObrigatorio", "minimo", "maximo"],
                                    include: [{model: ProductCombinationGroup, attributes: ['id', 'description'],
                                        include: [{model: ProductCombinationItem, attributes: ['id', 'name']}]
                                    }]    
                                }],
                            },
                            {model: SaleOrderItemCombination, attributes: ['id', 'saleOrderItemId', 'combinationId'],
                                include: [{model: SaleOrderItemCombinationItem, attributes: ['id', 'saleOrderItemCombinationId', 'itemCombinationId', 'quantity']}]
                            }]
                        },
                        {model: SaleOrderReceivie, attributes: ['id', 'dueDate', 'value'], include: [{model: ReceivieForm, attributes: ['id', 'description']}]},
                     
                    ],
                    where: {id: req.body.id}, transaction}
                );
    
                sequelize.close();
    
                res.status(200).json(saleOrder);
    
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

                const SaleOrder = req.body as SaleOrder;

                SaleOrder.value = _.sum(SaleOrder.items?.map(c => (parseFloat(c.value?.toString() || '0') - parseFloat(c.discount?.toString() || '0')) * parseFloat(c.quantity?.toString() || '0')));

                const valid = SaleOrderService.IsValid(SaleOrder);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!SaleOrder.id) {
                    await SaleOrderService.Create(SaleOrder, transaction);
                } else {
                    await SaleOrderService.Update(SaleOrder, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(SaleOrder);

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

                const empresa = await Company.findOne({attributes: ["address"], where: {id: empresaId}, transaction});
                
                const pedidoVenda = await SaleOrder.findAll({attributes: ["id", "entrega"], where: {id: ids}, transaction});

                let waypoints: any = pedidoVenda.map((c: any) => ({id: c.id, latitude: c.entrega.latitude, longitude: c.entrega.longitude}));

                let params = empresa?.address.longitude + "," + empresa?.address.latitude + ";";

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
                        
                        var pedidoVendaDeliveryRoute = new SaleOrderDeliveryRoute();
                        pedidoVendaDeliveryRoute.saleOrderId = item.id;
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