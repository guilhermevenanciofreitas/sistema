import { Request, Response } from "express";
import Auth from "../../auth";
import { Service } from "../../database";
import { ServiceService } from "../../services/registrations/service.service";
import {Op} from "sequelize";

export default class ServiceController {

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
        
                const services = await Service.findAndCountAll({attributes: ["id", "descricao"], where, order, limit, offset, transaction});
        
                sequelize.close();

                res.status(200).json({rows: services.rows, count: services.count, limit, offset: req.body.offset, filter, sort});

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

                const service = await Service.findOne({attributes: ["id", "descricao"], where: {id: req.body.id}, transaction});
    
                sequelize.close();
    
                res.status(200).json(service);
    
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

                const Service = req.body as Service;

                const valid = ServiceService.IsValid(Service);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Service.id) {
                    await ServiceService.Create(Service, transaction);
                } else {
                    await ServiceService.Update(Service, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Service);

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

                await ServiceService.Delete(req.body.id, transaction);

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