import { Request, Response } from "express";
import Auth from "../../auth";
import { Partner, Product, ProductCategory, ProductCombination, ProductCombinationGroup, ProductSupplier } from "../../database";
import { ProductService } from "../../services/registrations/product.service";
import { Op } from "sequelize";
import { Error } from "../../errors";

export default class ProductController {

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
                    attributes: ['id', 'name', 'value'],
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

                const product = await Product.findOne({
                    attributes: ['id', 'name', 'description', 'isCombination', 'value'], 
                    include: [
                        {model: ProductCategory, as: 'category', attributes: ['id', 'description']}, 
                        {model: ProductCombination, as: 'combinations', attributes: ['id', 'isObrigatorio', 'minimo', 'maximo'],
                            include: [{model: ProductCombinationGroup, as: 'combinationGroup', attributes: ['description']}]    
                        },
                        {model: ProductSupplier, as: 'suppliers', attributes: ['id'],
                            include: [{model: Partner, as: 'supplier', attributes: ['id', 'surname']}]
                        }, 
                    ],
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

                const product = req.body as Product;

                const valid = ProductService.IsValid(product);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!product.id) {
                    await ProductService.Create(product, transaction);
                } else {
                    await ProductService.Update(product, transaction);
                }

                await transaction?.commit();
                
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

    /*
    async update(req: Request, res: Response) {
        
        Auth(req, res).then(async ({transaction}) => {

            const Usuario = req.body as Usuario;

            const valid = UsuarioService.IsValid(Usuario);

            if (!valid.success) {
                res.status(201).json(valid);
                return;
            }

            await UsuarioService.Update(Usuario, transaction);

            await transaction?.commit();
            
            res.status(200).json(Usuario);
            
        }).catch((err) => {
            res.status(500).json(err);
        });
       
    }
    */

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await ProductService.Delete(req.body.id, transaction);

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