import { Request, Response } from "express";
import Auth from "../../auth";
import { User } from "../../database";
import { UserService } from "../../services/registrations/user.service";
import {Op} from "sequelize";
import { Error } from "../../errors";

export default class UserController {

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
        
                const users = await User.findAndCountAll({attributes: ["id", "nome", "email"], where, order, limit, offset, transaction});
        
                sequelize.close();

                res.status(200).json({rows: users.rows, count: users.count, limit, offset: req.body.offset, filter, sort});

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

                const usuario = await User.findOne({attributes: ["id", "nome", "email"], where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(usuario);
    
            }
            catch (error: any) {
                Error.Response(res, error);
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

                const User = req.body as User;

                const valid = UserService.IsValid(User);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!User.id) {
                    await UserService.Create(User, transaction);
                } else {
                    await UserService.Update(User, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(User);

            }
            catch (error: any) {
                Error.Response(res, error);
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

                await UserService.Delete(req.body.id, transaction);

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

}