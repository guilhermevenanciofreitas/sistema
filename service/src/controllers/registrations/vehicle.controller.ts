import { Request, Response } from "express";
import Auth from "../../auth";
import { User, Vehicle } from "../../database";
import { UserService } from "../../services/registrations/user.service";
import {Op} from "sequelize";
import { Error } from "../../errors";
import { VehicleService } from "../../services/registrations/vehicle.service";

export default class VehicleController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                /*
                if (filter?.nome) {
                    where = {"nome": {[Op.iLike]: `%${filter?.nome.replace(' ', "%")}%`}};
                }
        
                if (filter?.email) {
                    where = {"email": {[Op.iLike]: `%${filter?.email}%`}};
                }
                */
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const vehicles = await Vehicle.findAndCountAll({
                    attributes: ['id', 'name', 'plate'],
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
                        rows: vehicles.rows, count: vehicles.count
                    }
                });

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

                const vehicle = await Vehicle.findOne({
                    attributes: ['id', 'name', 'plate'],
                    where: {id: req.body.id},
                    transaction
                });
    
                sequelize.close();
    
                res.status(200).json(vehicle);
    
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

                const vehicle = req.body as Vehicle;

                const valid = VehicleService.IsValid(vehicle);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!vehicle.id) {
                    await VehicleService.Create(vehicle, transaction);
                } else {
                    await VehicleService.Update(vehicle, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(vehicle);

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

                await VehicleService.Delete(req.body.id, transaction);

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