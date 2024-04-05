import { Request, Response } from "express";
import Auth from "../../auth";
import { Nfe } from "../../database";
import { NfeService } from "../../services/fiscal/nfe.service";
import { Op } from "sequelize";

export default class NfeController {

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
        
                if (sort) {
                    order = [[sort.column, sort.direction]]
                }
        
                const produtos = await Nfe.findAndCountAll({attributes: [
                    "id",
                    [sequelize.json('ide.nNF'), 'numero'],
                    [sequelize.json('ide.serie'), 'serie'],
                    [sequelize.json('emit.xFant'), 'emitente'],
                    [sequelize.json('dest.xNome'), 'destinatario'],
                    [sequelize.json('total.ICMSTot.vNF'), 'valor'],
                ],
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

                const nfes = await Nfe.findOne({attributes: ["id"], 
                    where: {id: req.body.id}, transaction
                });

                sequelize.close();
    
                res.status(200).json(nfes);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

    async upload(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                //const nfes = await NfeService.Update(undefined, transaction);
    
                //res.status(200).json(nfes);
    
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

                const Nfe = req.body as Nfe;

                const valid = NfeService.IsValid(Nfe);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!Nfe.id) {
                    await NfeService.Create(Nfe, transaction);
                } else {
                    await NfeService.Update(Nfe, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Nfe);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });

    }

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await NfeService.Delete(req.body.id, transaction);

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