import { Request, Response } from "express";
import Auth from "../../auth";
import { Partner, SaleOrder, SaleOrderStatus } from "../../database";
import { OrderService } from "../../services/sales/order.service";
import { Error } from "../../errors";
import _ from "lodash";
import { ProgressService } from "../../services/sales/progress.service";

export default class ProgressController {

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
        
                const saleOrders = await SaleOrder.findAndCountAll({
                    attributes: ['id', 'number', 'valor'],
                    include: [
                        {model: Partner, as: "costumer", attributes: ["id", "nome"]},
                        {model: Partner, as: "seller", attributes: ["id", "nome"]},
                        {model: SaleOrderStatus, attributes: ["id", "descricao"]}
                    ],
                    where, order, limit, offset, transaction});

                const status = await SaleOrderStatus.findAll({order: [["ordem", "ASC"]], transaction});

                sequelize.close();

                res.status(200).json({
                    response: {
                        status, rows: saleOrders.rows, count: saleOrders.count
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

                const saleOrderStatus = await SaleOrderStatus.findOne({
                    attributes: ["id", "descricao", "color"],
                    where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(saleOrderStatus);
    
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

                const SaleOrderStatus = req.body as SaleOrderStatus;

                const valid = ProgressService.IsValid(SaleOrderStatus);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!SaleOrderStatus.id) {
                    await ProgressService.Create(SaleOrderStatus, transaction);
                } else {
                    await ProgressService.Update(SaleOrderStatus, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(SaleOrderStatus);

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

                await OrderService.Progress(req.body?.id, req.body?.statusId, transaction);

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

                await OrderService.Delete(req.body.id, transaction);

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