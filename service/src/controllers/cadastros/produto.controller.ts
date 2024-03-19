import { Request, Response } from "express";
import Auth from "../../auth";
import { Produto, ProdutoCombinacao } from "../../database";
import { ProdutoService } from "../../services/cadastros/produto.service";
import {Op} from "sequelize";

export default class ProdutoController {

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
                    where = {"descricao": {[Op.iLike]: `%${filter?.descricao.replace(' ', "%")}%`}};
                }
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const produtos = await Produto.findAndCountAll({attributes: ["id", "descricao"],
                    where, order, limit, offset, transaction
                });
        
                sequelize.close();

                res.status(200).json({rows: produtos.rows, count: produtos.count, limit, offset: req.body.offset, filter, sort});

            }
            catch (err) {
                res.status(500).json(err);
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

                const produto = await Produto.findOne({attributes: ["id", "descricao"], 
                    include: [{model: ProdutoCombinacao, attributes: ["id"]}],
                    where: {id: req.body.id}, transaction
                });
    
                sequelize.close();
    
                res.status(200).json(produto);
    
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

                const Produto = req.body as Produto;

                const valid = ProdutoService.IsValid(Produto);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Produto.id) {
                    await ProdutoService.Create(Produto, transaction);
                } else {
                    await ProdutoService.Update(Produto, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Produto);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
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

                await ProdutoService.Delete(req.body.id, transaction);

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