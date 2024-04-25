import { Request, Response } from "express";
import Auth from "../../auth";
import { Nfe, ShippingOrder } from "../../database";
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
                    attributes: ['id'],
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

    async upload(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                //const nfes = await NfeService.Update(undefined, transaction);
    
                //res.status(200).json(nfes);
    
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

                const Nfe = req.body as Nfe;

                const valid = ShippingOrderService.IsValid(Nfe);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Nfe.id) {
                    await ShippingOrderService.Create(Nfe, transaction);
                } else {
                    await ShippingOrderService.Update(Nfe, transaction);
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