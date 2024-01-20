import { Request, Response } from "express";
import Auth from "../../auth";
import { Usuario } from "../../database";
import { UsuarioService } from "../../services/usuario.service";
import { Sequelize } from "sequelize-typescript";
import {Op} from "sequelize";

export default class UsuarioController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({transaction, usuarioId, empresaId}) => {

            const limit = req.body.limit || undefined;
            const offset = ((req.body.offset - 1) * limit) || undefined;
            const filter = req.body.filter || undefined;
            const sort = req.body.sort || undefined;

            let where: any = {};
            let order: any = [];

            if (filter?.nome) {
                where = {"nome": {[Op.iLike]: `%${filter?.nome}%`}};
            }

            if (filter?.email) {
                where = {"email": {[Op.iLike]: `%${filter?.email}%`}};
            }

            if (sort) {
                order = [[sort.column, sort.direction]]
            }

            console.log(order);

            const usuarios = await Usuario.findAndCountAll({attributes: ["id", "nome", "email"], where, order, limit, offset, transaction});

            res.status(200).json({rows: usuarios.rows, count: usuarios.count, limit, offset: req.body.offset, filter, sort});

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    }

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async ({transaction}) => {

            const usuario = await Usuario.findOne({attributes: ["id", "nome", "email"], where: {id: req.body.id}, transaction});

            res.status(200).json(usuario);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async save(req: Request, res: Response) {
        
        Auth(req, res).then(async ({transaction}) => {

            const Usuario = req.body as Usuario;

            const valid = UsuarioService.IsValid(Usuario);

            if (!valid.success) {
                res.status(201).json(valid);
                return;
            }

            if (!Usuario.id) {
                await UsuarioService.Create(Usuario, transaction);
            } else {
                await UsuarioService.Update(Usuario, transaction);
            }

            await transaction?.commit();
            
            res.status(200).json(Usuario);
            
        }).catch((err) => {
            res.status(500).json(err);
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
        
        Auth(req, res).then(async ({transaction}) => {

            await UsuarioService.Delete(req.body.id, transaction);

            transaction?.commit();

            res.status(200).json({success: true});

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

}