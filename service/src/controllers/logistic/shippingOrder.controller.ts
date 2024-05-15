import { Request, Response } from "express";
import Auth from "../../auth";
import { Company, Nfe, Partner, ShippingOrder, ShippingOrderNfe, ShippingOrderVehicle, Vehicle } from "../../database";
import { ShippingOrderService } from "../../services/logistic/shippingOrder.service";
import { Op } from "sequelize";

export default class ShippingOrderController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const shippingOrders = await ShippingOrder.findAndCountAll({
                    attributes: ['id', 'value', 'weight'],
                    include: [
                        {model: Company, as: 'company', attributes: ['id', 'surname']},
                        {model: Partner, as: 'sender', attributes: ['id', 'surname']},
                        {model: Partner, as: 'recipient', attributes: ['id', 'surname']},
                        {model: Partner, as: 'driver', attributes: ['id', 'surname']},
                        {model: Vehicle, as: 'vehicle', attributes: ['id', 'name', 'plate']},
                    ],
                    where,
                    order,
                    limit: pagination.limit,
                    offset: pagination.offset1,
                    transaction
                });
        
                sequelize.close();

                res.status(200).json({
                    request: {
                        ...pagination
                    },
                    response: {
                        rows: shippingOrders.rows, count: shippingOrders.count
                    }
                });

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

                const shippingOrder = await ShippingOrder.findOne({
                    attributes: ['id', 'number', 'value', 'weight'],
                    include: [
                        {model: Company, as: 'company', attributes: ['id', 'surname']},
                        {model: Partner, as: 'sender', attributes: ['id', 'surname']},
                        {model: Partner, as: 'recipient', attributes: ['id', 'surname']},
                        {model: Partner, as: 'driver', attributes: ['id', 'surname']},
                        {model: Vehicle, as: 'vehicle', attributes: ['id', 'name', 'plate']},
                        {model: ShippingOrderVehicle, as: 'vehicles', attributes: ['id'],
                            include: [{model: Vehicle, as: 'vehicle', attributes: ['id', 'name', 'plate']}],
                        },
                        {model: ShippingOrderNfe, as: 'nfes', attributes: ['id'],
                            include: [{model: Nfe, as: 'nfe', attributes: ['id', 'NFe', 'protNFe']}],
                        },
                    ],
                    where: {id: req.body.id},
                    transaction
                });

                sequelize.close();
    
                res.status(200).json(shippingOrder);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

    async save(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const shippingOrder = req.body as ShippingOrder;

                const valid = ShippingOrderService.IsValid(shippingOrder);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!shippingOrder.id) {
                    await ShippingOrderService.Create(shippingOrder, transaction);
                } else {
                    await ShippingOrderService.Update(shippingOrder, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(shippingOrder);

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

                await ShippingOrderService.Delete(req.body.id, transaction);

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