import { Request, Response } from "express";
import Auth from "../../auth";
import { Product, ProdutoCategoria, ProdutoCombinacao, ProdutoCombinacaoGrupo } from "../../database";
import { ProductService } from "../../services/registrations/product.service";
import { Op } from "sequelize";

export default class ProductController {

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
        
                if (filter?.nome) {
                    where = {"nome": {[Op.iLike]: `%${filter?.nome.replace(' ', "%")}%`}};
                }
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const produtos = await Product.findAndCountAll({attributes: ["id", "nome"],
                    include: [{model: ProdutoCategoria, attributes: ["id", "descricao"]}],
                    where, order, limit, offset, transaction
                });
        
                sequelize.close();

                res.status(200).json({rows: produtos.rows, count: produtos.count, limit, offset: req.body.offset, filter, sort});

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

                const produto = await Product.findOne({attributes: ["id", "nome", "descricao", "isCombinacao", "valor"], 
                    include: [{model: ProdutoCategoria, attributes: ["id", "descricao"]}, {model: ProdutoCombinacao, attributes: ["id", "isObrigatorio", "minimo", "maximo"],
                        include: [{model: ProdutoCombinacaoGrupo, attributes: ["descricao"]}]    
                    }],
                    where: {id: req.body.id}, transaction
                });

                /*
include: [{model: ProdutoCombinacao, attributes: ["id", "isObrigatorio", "minimo", "maximo"],
                        include: [{model: ProdutoCombinacaoGrupo, attributes: ["id", "descricao"],
                            include: [{model: ProdutoCombinacaoItem, attributes: ["id", "descricao"]}]    
                        }]
                    }],
                */
    
                sequelize.close();
    
                res.status(200).json(produto);
    
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

                const Produto = req.body as Product;

                const valid = ProductService.IsValid(Produto);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Produto.id) {
                    await ProductService.Create(Produto, transaction);
                } else {
                    await ProductService.Update(Produto, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Produto);

            }
            catch (err) {
                res.status(500).json(err);
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
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

}