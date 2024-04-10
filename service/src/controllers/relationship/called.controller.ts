import { Request, Response } from "express";
import Auth from "../../auth";
import { Called, CalledOccurrence, Company, Partner, User } from "../../database";
import { UserService } from "../../services/registrations/user.service";
import {Op} from "sequelize";
import { Error } from "../../errors";
import { CalledService } from "../../services/relationships/called.service";
import _ from "lodash";

export default class CalledController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                const status = req.body.status;

                let where: any = {};
                let order: any = [];

                if (status == 'open') {
                    where = [{status: 'open', forecast: {[Op.gt]: new Date()}}];
                }

                if (status == 'late') {
                    where = [{status: 'open', forecast: {[Op.lt]: new Date()}}];
                }

                if (status == 'closed') {
                    where = [{status: 'closed'}];
                }
        
                if (pagination.filter?.nome) {
                    where = {"nome": {[Op.iLike]: `%${pagination.filter?.nome.replace(' ', "%")}%`}};
                }
        
                if (pagination.filter?.email) {
                    where = {"email": {[Op.iLike]: `%${pagination.filter?.email}%`}};
                }
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const calleds = await Called.findAndCountAll({
                    attributes: ['id', 'number', 'priority', 'subject', 'forecast', 'status', 'createdAt'],
                    include: [
                        {model: Company, attributes: ['id', 'nomeFantasia']},
                        {model: Partner, as: 'partner', attributes: ['id', 'nome']},
                        {model: Partner, as: 'responsible', attributes: ['id', 'nome']},
                        {model: CalledOccurrence, as: 'occurrence', attributes: ['id', 'description']}
                    ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction
                });

                for (let called of calleds.rows) {
                    if (called.dataValues.status == 'open' && called.dataValues.forecast < new Date()) {
                        called.dataValues.status = 'late';
                    }
                }

                const open = await Called.findAll({attributes: ["id"], where: {status: 'open', forecast: {[Op.gt]: new Date()}}, transaction});
                const late = await Called.findAll({attributes: ["id"], where: {status: 'open', forecast: {[Op.lt]: new Date()}}, transaction});
                const closed = await Called.findAll({attributes: ["id"], where: {status: 'closed'}, transaction});
                
                const status2 = {
                    open: {count: _.size(open)},
                    late: {count: _.size(late)},
                    closed: {count: _.size(closed)},
                }
        
                sequelize.close();

                res.status(200).json({
                    request: {
                        status, ...pagination
                    },
                    response: {
                        status: status2, rows: calleds.rows, count: calleds.count
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

                const called = await Called.findOne({
                    attributes: ['id', 'number', 'priority', 'subject', 'forecast', 'status', 'createdAt'],
                    include: [
                        {model: Company, attributes: ['id', 'nomeFantasia']},
                        {model: Partner, as: 'partner', attributes: ['id', 'nome']},
                        {model: Partner, as: 'responsible', attributes: ['id', 'nome']},
                        {model: CalledOccurrence, as: 'occurrence', attributes: ['id', 'description']}
                    ],
                    where: {id: req.body.id}, transaction
                });

                if (called?.status == 'open' && (called.forecast || '') < new Date()) {
                    called.status = 'late';
                }
    
                sequelize.close();
    
                res.status(200).json(called);
    
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

                const Called = req.body as Called;

                const valid = CalledService.IsValid(Called);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Called.id) {
                    await CalledService.Create(Called, transaction);
                } else {
                    await CalledService.Update(Called, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Called);

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