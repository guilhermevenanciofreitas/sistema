import { Request, Response } from "express";
import Auth from "../../auth";
import { StockLocation } from "../../database";
import { LocationService } from "../../services/stock/location.service";
import {Op} from "sequelize";
import { Error } from "../../errors";

export default class LocationController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const stockLocations = await StockLocation.findAndCountAll({
                    attributes: ['id', 'name', 'description'],
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
                        rows: stockLocations.rows, count: stockLocations.count
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

                const stockLocation = await StockLocation.findOne({attributes: ['id', 'name', 'description'], where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(stockLocation);
    
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

                const stockLocation = req.body as StockLocation;

                const valid = LocationService.IsValid(stockLocation);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!stockLocation.id) {
                    await LocationService.Create(stockLocation, transaction);
                } else {
                    await LocationService.Update(stockLocation, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(stockLocation);

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

                await LocationService.Delete(req.body.id, transaction);

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