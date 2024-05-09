import { Request, Response } from "express";
import Auth from "../../auth";
import { Nfe, Partner, Product, StockIn, StockInProduct, StockLocation } from "../../database";
import { StockInService } from "../../services/stock/in.service";
import {Op} from "sequelize";
import { Error } from "../../errors";

export default class StockInController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                const status = req.body.status || undefined;

                let where: any = {};
                let order: any = [['createdAt', 'desc']];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }

                if (status) {
                    where = {"status": status};
                }
        
                const stockIns = await StockIn.findAndCountAll({
                    attributes: ['id', 'createdAt', 'status'],
                    include: [
                        {model: Nfe, as: 'nfe', attributes: ['id', 'protNFe']}
                    ],
                    where,
                    order,
                    limit: pagination.limit,
                    offset: pagination.offset1,
                    transaction
                });

                const pending = await StockIn.count({where: {status: 'pending'}, transaction});
                const checkIn = await StockIn.count({where: {status: 'checkIn'}, transaction});

                const status2 = {
                    pending: {count: pending},
                    checkIn: {count: checkIn},
                }

                sequelize.close();

                res.status(200).json({
                    request: {
                        status, ...pagination
                    },
                    response: {
                        status: status2, rows: stockIns.rows, count: stockIns.count
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

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const stock = await StockIn.findOne({
                    attributes: ['id', 'status'],
                    include: [
                        {model: Nfe, as: 'nfe', attributes: ['id', 'NFe', 'protNFe']},
                        {model: Partner, as: 'supplier', attributes: ['id', 'surname']},
                        {model: StockInProduct, as: 'products', attributes: ['id', 'stockInId', 'quantity', 'value', 'prod'],
                            include: [
                                {model: StockLocation, as: 'stockLocation', attributes: ['id', 'name']},
                                {model: Product, as: 'product', attributes: ['id', 'name']}
                            ]
                        }
                    ],
                    where: {id: req.body.id},
                    transaction
                });
    
                sequelize.close();
    
                res.status(200).json(stock);
    
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

                const stockin = req.body as StockIn;

                const valid = StockInService.IsValid(stockin);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!stockin.id) {
                    await StockInService.Create(stockin, transaction);
                } else {
                    await StockInService.Update(stockin, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(stockin);

            }
            catch (error: any) {
                Error.Response(res, error);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });

    }

    async checkIn(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await StockInService.CheckIn(req.body.id, transaction);

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

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await StockInService.Delete(req.body.id, transaction);

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

}