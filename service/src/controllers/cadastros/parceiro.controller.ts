import { Request, Response } from "express";
import Auth from "../../auth";
import { Parceiro, Usuario } from "../../database";
import { ParceiroService } from "../../services/parceiro.service";
import {Op} from "sequelize";

export default class ParceiroController {

    async findAll(req: Request, res: Response, column: string) {

        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const limit = req.body.limit || undefined;
                const offset = ((req.body.offset - 1) * limit) || undefined;
                const filter = req.body.filter || undefined;
                const sort = req.body.sort || undefined;
        
                let where: any = {};
                let order: any = [];

                where = {[column]: true};
        
                if (filter?.cpfCnpj) {
                    where = {"cpfCnpj": {[Op.iLike]: `%${filter?.cpfCnpj.replace(' ', "%")}%`}};
                }

                if (filter?.nome) {
                    where = {"nome": {[Op.iLike]: `%${filter?.nome.replace(' ', "%")}%`}};
                }
        
                if (filter?.apelido) {
                    where = {"apelido": {[Op.iLike]: `%${filter?.apelido}%`}};
                }
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const parceiros = await Parceiro.findAndCountAll({attributes: ["id", "cpfCnpj", "nome", "apelido"], where, order, limit, offset, transaction});
                
                sequelize.close();

                res.status(200).json({rows: parceiros.rows, count: parceiros.count, limit, offset: req.body.offset, filter, sort});

            }
            catch (err)
            {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async findOne(req: Request, res: Response, tipo: string) {

        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const parceiro = await Parceiro.findOne({attributes: [
                    "id",
                    "cpfCnpj",
                    "nome",
                    "apelido",
                    "isCliente",
                    "isFornecedor",
                    "isTransportadora",
                    "isFuncionario",
                    "nascimento",
                    "sexo",
                    "estadoCivil",
                    "rg",
                    "ie",
                    "im",
                    "escolaridade",
                    "profissao",
                    "isAtivo",
                    "isBloquearVenda",
                    "isBloquearCompra"
                ], where: {id: req.body.id}, transaction});
    
                res.status(200).json(parceiro);

                sequelize.close();

            }
            catch (err)
            {
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

                const Parceiro = req.body as Parceiro;
    
                const valid = ParceiroService.IsValid(Parceiro);
    
                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }
    
                if (!Parceiro.id) {
                    await ParceiroService.Create(Parceiro, transaction);
                } else {
                    await ParceiroService.Update(Parceiro, transaction);
                }
    
                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Parceiro);

            }
            catch (err)
            {
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

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({transaction}) => {

            await UsuarioService.Delete(req.body.id, transaction);

            transaction?.commit();

            res.status(200).json({success: true});

        }).catch((err) => {
            res.status(401).json(err);
        });

    }
    */

}