import { Request, Response } from "express";
import Auth from "../../auth";
import { Usuario } from "../../database";
import { UsuarioService } from "../../services/usuario.service";

export default class UsuarioController {

    async test(req: Request, res: Response) {
        console.log('test');
        res.status(200).json({message: "success!"})
    }

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async (transaction) => {

            const usuarios = await Usuario.findAll({attributes: ["id", "nome", "email"], transaction});

            res.status(200).json(usuarios);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async (transaction) => {

            const usuario = await Usuario.findOne({attributes: ["id", "nome", "email"], where: {id: req.body.id}, transaction});

            res.status(200).json(usuario);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async create(req: Request, res: Response) {
        
        Auth(req, res).then(async (transaction) => {

            const Usuario = req.body as Usuario;

            if (Usuario.email == '') {
                res.status(201).json({message: 'Informe o e-mail!'});
                return;
            }

            await UsuarioService.Add(Usuario, transaction);

            await transaction?.commit();
            
            res.status(200).json(Usuario);
            
        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async (transaction) => {

            await UsuarioService.Delete(req.body.id, transaction);

            transaction?.commit();

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

}