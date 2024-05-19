import { Request, Response } from "express";
import Auth from "../../auth";
import { Product, ProductCategory, ProductSubCategory } from "../../database";
import { Op } from "sequelize";
import { Error } from "../../errors";
import { ProductSubCategoryService } from "../../services/registrations/productSubCategory.service";

export default class ProductCategoryController {

    async findAll(req: Request, res: Response) {

    }

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const productSubCategory = await ProductSubCategory.findOne({
                    attributes: ['id', 'name'],
                    include: [{model: ProductCategory, as: 'category', attributes: ['id', 'description']}],
                    where: {id: req.body.id},
                    transaction
                });

                sequelize.close();
    
                res.status(200).json(productSubCategory);
    
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

                const productSubCategory = req.body as ProductSubCategory;

                const valid = ProductSubCategoryService.IsValid(productSubCategory);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!productSubCategory.id) {
                    await ProductSubCategoryService.Create(productSubCategory, transaction);
                } else {
                    await ProductSubCategoryService.Update(productSubCategory, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(productSubCategory);

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

                await ProductSubCategoryService.Delete(req.body.id, transaction);

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