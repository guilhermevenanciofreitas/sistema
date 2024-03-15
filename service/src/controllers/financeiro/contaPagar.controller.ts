import { Request, Response } from "express";
import Auth from "../../auth";
import { ContaPagar, Parceiro } from "../../database";
import {Op} from "sequelize";
import { ContaPagarService } from "../../services/financeiro/contaPagar.service";

export default class ContaPagarController {

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
        
                if (filter?.email) {
                    where = {"email": {[Op.iLike]: `%${filter?.email}%`}};
                }
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const contasPagar = await ContaPagar.findAndCountAll({attributes: 
                    ["id", "numeroDocumento", "valor", "emissao", "vencimento"],
                    //include: [{model: Parceiro, attributes: ["id", "nome"]}],
                    where, order, limit, offset, transaction});

                sequelize.close();

                res.status(200).json({rows: contasPagar.rows, count: contasPagar.count, limit, offset: req.body.offset, filter, sort});

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

                const contaPagar = await ContaPagar.findOne({
                    attributes: ["id", "numeroDocumento", "valor", "emissao", "vencimento"],
                    include: [{model: Parceiro, attributes: ["id", "nome"]}],
                    where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(contaPagar);
    
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

                const ContaPagar = req.body as ContaPagar;

                ContaPagar.recebedorId = req.body.recebedor?.id || null;

                const valid = ContaPagarService.IsValid(ContaPagar);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!ContaPagar.id) {
                    await ContaPagarService.Create(ContaPagar, transaction);
                } else {
                    await ContaPagarService.Update(ContaPagar, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(ContaPagar);

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

                await ContaPagarService.Delete(req.body.id, transaction);

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