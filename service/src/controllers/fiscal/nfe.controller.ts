import { Request, Response } from "express";
import Auth from "../../auth";
import { Company, Nfe, State } from "../../database";
import { NfeService } from "../../services/fiscal/nfe.service";
import { Op } from "sequelize";
import axios from "axios";
import formidable from "formidable";
import fs from "fs";

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
                    [sequelize.json('NFe.infNFe.ide.nNF'), 'numero'],
                    [sequelize.json('NFe.infNFe.ide.serie'), 'serie'],
                    [sequelize.json('NFe.infNFe.emit.xFant'), 'emitente'],
                    [sequelize.json('NFe.infNFe.dest.xNome'), 'destinatario'],
                    [sequelize.json('NFe.infNFe.total.ICMSTot.vNF'), 'valor'],
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

                const nfe = await Nfe.findOne({
                    attributes: ['id', 'NFe'], 
                    where: {id: req.body.id},
                    transaction
                });

                sequelize.close();
    
                res.status(200).json(nfe);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

    async statusService(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, companyId}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const company = await Company.findOne(
                {
                    attributes: ['id', 'cpfCnpj', 'address', 'certificate'],
                    where: {id: companyId},
                    transaction
                });

                const state = await State.findOne({attributes: ['id', 'acronym'], where: {id: company?.address?.stateId}, transaction});

                const request = {certificate: {file: company?.certificate.file, password: company?.certificate.password}, acronym: state?.acronym};

                const response = await axios.post('http://localhost:5277/nfe/status-service', request);

                res.status(response.status).json(response.data);

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

    async xml(req: Request, res: Response) {
        
        const form = formidable();

        form.parse(req, async (err, fields: any, files: any) => {

            const xml = fs.readFileSync(files.file[0].filepath, 'utf8');

            const nfe = await NfeService.XmlToJson(xml);

            res.status(200).json({NFe: nfe.nfeProc?.NFe, protNFe: nfe.nfeProc?.protNFe});

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