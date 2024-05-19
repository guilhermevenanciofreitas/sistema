import { Request, Response } from "express";
import Auth from "../../auth";
import { Cte } from "../../database";
import { CteService } from "../../services/fiscal/cte.service";
import { Op } from "sequelize";
import formidable from "formidable";
import fs from "fs";

export default class CteController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const ctes = await Cte.findAndCountAll({attributes: [
                    "id",
                    [sequelize.json('CTe.infCTe.ide.nCT'), 'numero'],
                    [sequelize.json('CTe.infCTe.ide.serie'), 'serie'],
                    [sequelize.json('CTe.infCTe.emit.xFant'), 'emitente'],
                    [sequelize.json('CTe.infCTe.dest.xNome'), 'destinatario'],
                    //[sequelize.json('CTe.infCTe.total.ICMSTot.vNF'), 'valor'],
                ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction
                });
        
                sequelize.close();

                res.status(200).json({
                    request: {
                        ...pagination
                    },
                    response: {
                        rows: ctes.rows, count: ctes.count
                    }
                });

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

                const cte = await Cte.findOne({
                    attributes: ['id', 'CTe', 'protCTe'],
                    where: {id: req.body.id},
                    transaction
                });

                sequelize.close();
    
                res.status(200).json(cte);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

    /*async downloadXml(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const ctes = await Cte.findAll({where: {id: {[Op.in]: req.body.id}}, transaction});

                for (const cte of ctes) {

                    const xml = await CteService.Xml(cte, transaction);

                }

                const fileData = 'SGVsbG8sIFdvcmxkIQ==';
                const fileName = 'hello_world.txt';
                const fileType = 'text/plain';

                res.writeHead(200, {
                    'Content-Disposition': `attachment; filename="${fileName}"`,
                    'Content-Type': fileType,
                });
                
                const download = Buffer.from(fileData, 'base64');
                res.end(download);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }
    */

    async xml(req: Request, res: Response) {
        
        const form = formidable();

        form.parse(req, async (err, fields: any, files: any) => {

            const xml = fs.readFileSync(files.file[0].filepath, 'utf8');

            const cte = await CteService.XmlToJson(xml);

            res.status(200).json({CTe: cte.cteProc?.CTe, protCTe: cte.cteProc?.protCTe});

        });

    }

    async save(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const cte = req.body as Cte;

                const valid = CteService.IsValid(cte);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!cte.id) {
                    await CteService.Create(cte, transaction);
                } else {
                    await CteService.Update(cte, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(cte);

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

                await CteService.Delete(req.body.id, transaction);

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