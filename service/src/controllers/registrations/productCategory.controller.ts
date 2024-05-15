import { Request, Response } from "express";
import Auth from "../../auth";
import { Product, ProductCategory } from "../../database";
import { Op } from "sequelize";
import { Error } from "../../errors";
import { ProductCategoryService } from "../../services/registrations/productCategory.service";

export default class ProductCategoryController {

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
        
                const products = await Product.findAndCountAll({
                    attributes: ['id', 'name', 'value', 'stockBalance'],
                    include: [{model: ProductCategory, attributes: ['id', 'description']}],
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
                        rows: products.rows, count: products.count
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

                const product = await ProductCategory.findOne({
                    attributes: ['id', 'description'],
                    where: {id: req.body.id},
                    transaction
                });

                sequelize.close();
    
                res.status(200).json(product);
    
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

                const productCategory = req.body as ProductCategory;

                const valid = ProductCategoryService.IsValid(productCategory);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!productCategory.id) {
                    await ProductCategoryService.Create(productCategory, transaction);
                } else {
                    await ProductCategoryService.Update(productCategory, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(productCategory);

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

                await ProductCategoryService.Delete(req.body.id, transaction);

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