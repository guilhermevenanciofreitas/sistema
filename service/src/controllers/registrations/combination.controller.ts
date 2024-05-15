import { Request, Response } from "express";
import Auth from "../../auth";
import { Combination } from "../../database";
import { Op } from "sequelize";
import { Error } from "../../errors";
import { CombinationService } from "../../services/registrations/combination.service";

export default class CombinationController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                if (pagination.filter?.name) {
                    where = {'name': {[Op.iLike]: `%${pagination.filter?.name.replace(' ', "%")}%`}};
                }
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const combinations = await Combination.findAndCountAll({
                    attributes: ['id', 'name', 'value', 'stockBalance'],
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
                        rows: combinations.rows, count: combinations.count
                    }
                });

            }
            catch (error: any) {
                Error.Response(res, error);
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

                const combination = await Combination.findOne({
                    attributes: ['id', 'name'],
                    where: {id: req.body.id},
                    transaction
                });

                sequelize.close();
    
                res.status(200).json(combination);
    
            }
            catch (error: any) {
                Error.Response(res, error);
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

                const combination = req.body as Combination;

                const valid = CombinationService.IsValid(combination);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!combination.id) {
                    await CombinationService.Create(combination, transaction);
                } else {
                    await CombinationService.Update(combination, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(combination);

            }
            catch (error: any) {
                Error.Response(res, error);
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

                await CombinationService.Delete(req.body.id, transaction);

                await transaction?.commit();

                sequelize.close();

                res.status(200).json({success: true});

            }
            catch (error: any) {
                Error.Response(res, error);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

}